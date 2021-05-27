var https = require('https');

function input(req, res, next){
    var url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
    let options = {headers:{'User-Agent': 'request'}};
    let dat = "";
    https.get(url, options, function(response){
        response.on('data', function(chunk){
            dat+=chunk;
            console.log("DAT= " + dat)
        })
        response.on('end', function(){
            let obj = JSON.parse(dat);
            res.locals.inJSON = obj
            console.log(JSON.stringify(obj));
            next(req, res);
        })
    })
}

function display(req, res){
    obj = res.locals.inJSON;
    res.render("apod.hbs", obj);
}

module.exports.run_setup = function(app){
    app.get('/apod', [input, display]);
}