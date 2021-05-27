var https = require('https');

function input(req, res){
    var url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
    if(req.query.date !== ""){
        url += "&date=" + req.query.date;
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
            res.locals.inJSON = dat
            if(obj.copyright !== null){
                obj.author = true
            }
            else{
                obj.author =false;
            }
            console.log(JSON.stringify(obj));
            res.render("apod.hbs", obj);
            // next(req, res);
        })
    })
}

module.exports.run_setup = function(app){
    app.get('/apod', input);
}