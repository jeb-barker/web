var express = require('express');
var hbs = require('hbs');

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

    obj.labs = [{ title: "Dog-Cat-Fish", link: "/dogcatfish" }]//TODO: Add link

    res.render("index.hbs", obj);
});

app.get('/dogcatfish', function (req, res) {

    console.log('user landed at Dog-Cat-Fish');
    let obj = {}
    let hbsPage = "dcf.hbs"
    obj.animals = [{ name: "Dog", linkA: "/dog", linkB: "/pet?type=dog" }, { name: "Cat", linkA: "/cat", linkB: "/pet?type=cat" }, { name: "Fish", linkA: "/fish", linkB: "/pet?type=fish" }]//TODO: Add link

    obj.main = true
    obj.CSSLink = "https://jbarkerwebdev.sites.tjhsst.edu/styles/css?name=styles";

    let dater = new Date();
    let month = dater.getMonth() + 1;
    let date = dater.getDate();
    let year = dater.getFullYear();

    obj.month = month;
    obj.day = date;
    obj.year = year;


    res.render(hbsPage, obj);
});

app.get('/dog', function (req, res) {

    console.log('user landed at dog');

    let obj = {}

    let dater = new Date();
    let month = dater.getMonth() + 1;
    let date = dater.getDate();
    let year = dater.getFullYear();
    console.log("\tGot date as: " + month + "/" + date + "/" + year);

    obj.month = month;
    obj.day = date;
    obj.year = year;

    obj.truth = false
    obj.error = false
    obj.type = "dog"
    obj.imgsrc = "https://assets3.thrillist.com/v1/image/2622128/1200x600/crop"

    obj.CSSLink = "https://jbarkerwebdev.sites.tjhsst.edu/styles/css?name=dcf";

    res.render("dcf2.hbs", obj);
});

app.get('/cat', function (req, res) {

    console.log('user landed at cat');

    let obj = {}

    let dater = new Date();
    let month = dater.getMonth() + 1;
    let date = dater.getDate();
    let year = dater.getFullYear();
    console.log("\tGot date as: " + month + "/" + date + "/" + year);

    obj.month = month;
    obj.day = date;
    obj.year = year;

    obj.truth = false
    obj.error = false
    obj.type = "cat"
    obj.imgsrc = "https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/08/beagle-card-medium.jpg?bust=1535569257"
    

    obj.CSSLink = "https://jbarkerwebdev.sites.tjhsst.edu/styles/css?name=dcf";

    res.render("dcf2.hbs", obj);
});

app.get('/fish', function (req, res) {

    console.log('user landed at fish');

    let obj = {}

    let dater = new Date();
    let month = dater.getMonth() + 1;
    let date = dater.getDate();
    let year = dater.getFullYear();
    console.log("\tGot date as: " + month + "/" + date + "/" + year);

    obj.month = month;
    obj.day = date;
    obj.year = year;

    obj.CSSLink = "https://jbarkerwebdev.sites.tjhsst.edu/styles/css?name=dcf";

    res.render("instructions.hbs", obj);
});

app.get('/pet', function (req, res) {

    console.log('user landed at pet');

    let obj = {}

    let dater = new Date();
    let month = dater.getMonth() + 1;
    let date = dater.getDate();
    let year = dater.getFullYear();
    console.log("\tGot date as: " + month + "/" + date + "/" + year);

    obj.month = month;
    obj.day = date;
    obj.year = year;

    obj.CSSLink = "https://jbarkerwebdev.sites.tjhsst.edu/styles/css?name=dcf";

    if(req.query.type == "dog"){
        obj.type = "dog"
        obj.truth = true;
        obj.error = false
        obj.imgsrc = "https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/08/beagle-card-medium.jpg?bust=1535569257"
    }
    else if(req.query.type == "cat"){
        obj.type = "cat"
        obj.truth = true;
        obj.error = false
        obj.imgsrc = "https://assets3.thrillist.com/v1/image/2622128/1200x600/crop"
    }
    else{
        obj.truth = true;
        obj.error = true
    }

    res.render("dcf2.hbs", obj);
});

app.get('/styles/css', function (req, res) {
    if (req.query.name == "styles") {
        res.sendFile(__dirname + "/css/styles.css");
    }
    else if (req.query.name == "dcf") {
        res.sendFile(__dirname + "/css/dog-cat-fish.css");
    }
});

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function () {

    console.log("Express server started");

});