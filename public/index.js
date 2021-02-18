var express = require( 'express' );
var hbs = require( 'hbs' );

var app = express();


app.use(express.static("web/public/views"));

app.get( '/' , function( req , res ) {

    console.log( 'user landed at main page' );
    
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

    obj.labs = [{title: "Dog-Cat-Fish", link: "/dogcatfish"}]//TODO: Add link

    res.render("index.hbs", obj);
});

app.get( '/dogcatfish' , function( req , res ) {

    console.log( 'user landed at Dog-Cat-Fish' );
    let obj = {}
    let hbsPage = "dcf.hbs"
    let pref = "http://localhost:8080/dogcatfish" //testing on PC
    obj.animals = [{name: "Dog", linkA: "?page=dog", linkB: "?page=dog&type=dog"}, {name: "Cat", linkA: "?page=cat", linkB: "?page=cat&type=cat"}, {name: "Fish", linkA: "?page=fish", linkB: "?page=fish&type=fish"}]//TODO: Add link

    if(req.query.page == "home" || req.query.page == "" || req.query.page == null){
        obj.main = true
        obj.CSSLink = "https://jbarkerwebdev.sites.tjhsst.edu/styles/css?name=styles";
    }
    else if(req.query.page == "dog"){
        obj.main = false;
        obj.type = "dog"
        if(req.query.type == "dog"){
            obj.truth = true
            obj.imgsrc = "https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/08/beagle-card-medium.jpg?bust=1535569257"
        }
        else if(req.query.type == null){
            obj.truth = false
            obj.imgsrc = "https://assets3.thrillist.com/v1/image/2622128/1200x600/crop;"
        }
        else{
            obj.truth = false
            obj.error = true
        }
    }
    else if(req.query.page == "cat"){
        obj.main = false;
        obj.type = "cat"
        if(req.query.type == "cat"){
            obj.truth = true
            obj.imgsrc = "https://assets3.thrillist.com/v1/image/2622128/1200x600/crop;"
        }
        else if(req.query.type == null){
            obj.truth = false
            obj.imgsrc = "https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/08/beagle-card-medium.jpg?bust=1535569257"
        }
        else{
            obj.truth = false
            obj.error = true
        }
    }
    else if(req.query.page == "fish"){
        hbsPage = "instructions.hbs"
        if(req.query.type != null){
            hbsPage = "dcf.hbs"
            obj.truth = false
            obj.error = true
        }
    }
    else{
        obj.truth = false
        obj.error = true
    }
    
    
    let dater = new Date();
    let month = dater.getMonth() + 1;
    let date = dater.getDate();
    let year = dater.getFullYear();

    
    obj.month = month;
    obj.day = date;
    obj.year = year;
    

    res.render(hbsPage, obj);
});

app.get( '/styles/css' , function( req , res ) {
    if(req.query.name == "styles"){
        res.sendFile(__dirname + "/css/styles.css");
    }
});

var listener = app.listen( process . env . PORT || 8080 , process . env . HOST || "0.0.0.0" , function() {

    console.log( "Express server started" );

});