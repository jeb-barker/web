let dat = "";

function input(req, res, next){
    https.get(url, options, function(response){
        response.on('data', function(chunk){
            dat+=chunk;
            console.log("DAT= " + dat)
        })
        response.on('end', function(){
            res.locals.inJSON = JSON.parse(dat);
            next(req, res);
        })
    })
}

function display(req, res){
    res.json(res.locals.inJSON);
}

module.exports.run_setup = function(app){
    app.get('/apod', [input, display]);
}