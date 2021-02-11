var express = require( 'express' );
var hbs = require( 'hbs' );

var app = express();


app.use(express.static("Web-App-Development/LocalNodeTest/views"));

app.get( '/' , function( req , res ) {

    console.log( 'user landed at page' );
    
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

    res.render("index.hbs", obj);
});

app.get( '/styles/css' , function( req , res ) {
    if(req.query.name == "styles"){
        res.sendFile(__dirname + "/css/styles.css");
    }
});

var listener = app.listen( process . env . PORT || 8080 , process . env . HOST || "0.0.0.0" , function() {

    console.log( "Express server started" );

});