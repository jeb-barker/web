function input(req, res, next){
    https.get(url, options, function(response){
        response.on('data', function(chunk){
            let dat = "";
            dat
        })
    })
}


module.exports.run_setup = function(app){
    app.get('/apod', [input, display]);
}