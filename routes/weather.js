// weather forecast data from weather.gov
function accumulate_input(req, res, next){
    var url = 'https://api.weather.gov/points/'
    if(req.query.lat !== ""){
        
        url += parseFloat(req.query.lat.toFixed(4)) + ",";
    }
    else{
        let error = true
        res.render('weather.hbs')
    }
    if(req.query.long !== ""){
        url += parseFloat(req.query.long.toFixed(4)) + "";
    }
    let options = {headers:{'User-Agent': 'request'}};
    let dat = "";
    https.get(url, options, function(response){
        response.on('data', function(chunk){
            dat+=chunk;
            console.log("DAT= " + dat)
        })
        response.on('end', function(){
            let obj = JSON.parse(dat);
            console.log("\n-----\n"+JSON.stringify(obj));
            if(req.query.detail === true){
                res.locals.requestURL = obj.properties.forecastHourly;
            }
            else{
                res.locals.requestURL = obj.properties.forecast;
            }
            
            next();
        })
    }).on('error', function(e){
        console.log(e.message);
    })
}

function forecast(req, res, next){
    var url = res.locals.requestURL
    let options = {headers:{'User-Agent': 'request'}};
    let dat = "";
    https.get(url, options, function(response){
        response.on('data', function(chunk){
            dat+=chunk;
            console.log("DAT= " + dat)
        })
        response.on('end', function(){
            let obj = JSON.parse(dat);
            console.log(JSON.stringify(obj));
            res.locals.forecast = dat
            next();
        })
    })
}

function display(req, res){
    let dat = res.locals.forecast;
    let obj = JSON.parse(dat);
    console.log(JSON.stringify(obj))
    res.json(obj);
}

module.exports.run_setup = function(app){
    app.get('/weather', [accumulate_input, forecast, display])
}