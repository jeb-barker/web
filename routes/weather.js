var https = require('https');
// weather forecast data from weather.gov


module.exports.run_setup = function(app){
    app.get('/weather', [accumulate_input, forecast, display])
}

function accumulate_input(req, res, next){
    var url = 'https://api.weather.gov/points/'
    console.log(url)
    if('lat' in req.query){
        console.log(url)
        url = url + req.query.lat + ",";
    }
    else{
        let error = true
        res.render('weather.hbs', {})
    }
    if('long' in req.query){
        url = url + req.query.lat;
    }
    else{
        let error = true
        res.render('weather.hbs', {})
    }
    console.log(url)
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
            
            next(req, res);
        })
    })
}

function forecast(req, res, next){
    var url = res.locals.requestURL
    let options = {headers:{'User-Agent': 'request'}};
    let dat = "";
    https.get(url, function(response){
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