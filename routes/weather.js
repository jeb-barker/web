var https = require('https');
// weather forecast data from weather.gov


module.exports.run_setup = function(app){
    app.get('/weather', [accumulate_input, forecast, display])
}

function accumulate_input(req, res, next){
    var url = 'https://api.weather.gov/points/'
    let obj = {}
    console.log(url)
    if('lat' in req.query){
        console.log(url)
        url = url + req.query.lat + ",";
    }
    else{
        obj.error = true
        res.render('weather.hbs', obj)
        return null
    }
    if('long' in req.query){
        url = url + req.query.long;
    }
    else{
        obj.error = true
        res.render('weather.hbs', obj)
        return null
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
            if(obj.status === 404 || obj.status === 500 || obj.status === 301){
                obj.error = true
                console.log("\n-----\n\n"+JSON.stringify(obj));
                res.render('weather.hbs', obj)
                return null
            }
            if(req.query.detail == 'true'){
                res.locals.requestURL = obj.properties.forecastHourly;
            }
            else{
                res.locals.requestURL = obj.properties.forecast;
            }
            res.locals.originJSON = obj
            next();
        })
    })
}

function forecast(req, res, next){
    var url = res.locals.requestURL
    let options = {headers:{'User-Agent': 'request'}};
    let dat = "";
    https.get(url, options, function(response){
        response.on('data', function(chunk){
            dat+=chunk;
            console.log("DATA= " + dat)
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
    obj['origin'] = res.locals.originJSON
    if(req.query.detail == 'true'){
        for(let x = 0; x < obj.properties.periods.length; x++){
            obj.properties.periods[x].name = obj.properties.periods[x].startTime.substring(5, 10)
            obj.properties.periods[x].name += " " + obj.properties.periods[x].startTime.substring(11, 16)
        }
    }
    console.log(JSON.stringify(obj))
    console.log("ORGIGIN JSON:\n\n\n" + JSON.stringify(res.locals.originJSON))
    res.render("weather.hbs", obj);
}