module.exports.run_setup = function(app){
    app.get('/styles/css', function (req, res) {
        if (req.query.name == "styles") {
            res.sendFile(__dirname + "/css/styles.css");
        }
        else if (req.query.name == "dcf") {
            res.sendFile(__dirname + "/css/dog-cat-fish.css");
        }
        else if (req.query.name == "facts") {
            res.sendFile(__dirname + "/css/facts.css");
        }
    });
}