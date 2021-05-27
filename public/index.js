var express = require('express');
var hbs = require('hbs');
var routes = require('./routes');

var app = express();


app.use(express.static("web/public/views"));

app.get('/', function (req, res) {

    console.log('user landed at main page');

    let obj = {}

    let dater = new Date();
    let month = dater.getMonth() + 1;
    let date = dater.getDate();
    let year = dater.getFullYear();
    console.log("\tGot date as: " + month + "/" + date + "/" + year);

    obj.name = "Jeb Barker";
    obj.month = month;
    obj.day = date;
    obj.year = year;

    obj.CSSLink = "https://jbarkerwebdev.sites.tjhsst.edu/styles/css?name=styles";

    obj.labs = [
        { title: "Dog-Cat-Fish", link: "/dogcatfish" },
        { title: "Facts About", link: "/facts" }
    ]//TODO: Add link

    res.render("index.hbs", obj);
});

routes.do_setup(app);

app.get('*', function (req, res) {
    res.status(404).send('Someone did an oopsie! you tried to go to ' + req.protocol + '://' + req.get('host') + req.originalUrl);
});

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function () {

    console.log("Express server started");

});
