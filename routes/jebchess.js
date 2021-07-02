var cookieSession = require('cookie-session')
const {AuthorizationCode} = require('simple-oauth2');
var https = require('https');
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var GOOGLE_CLIENT_ID     = '221807810876-5hs2o3ver5hco9v5jmm6hcmqodb80e0j.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = '49v2ycwavKT22o_mg01fg4iw';
var google_redirect_uri  = 'https://jbarkerwebdev.sites.tjhsst.edu/jebchess/login_helper';
var userProfile = ""

var mysql = require('mysql');
console.log(process.env.DIRECTOR_DATABASE_HOST)
var connection = mysql.createConnection( 
  {
    host: process.env.DIRECTOR_DATABASE_HOST,
    user: process.env.DIRECTOR_DATABASE_USERNAME,
    password: process.env.DIRECTOR_DATABASE_PASSWORD,
    database: process.env.DIRECTOR_DATABASE_NAME
  }
)

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}

var database = new Database({
    host: process.env.DIRECTOR_DATABASE_HOST,
    user: process.env.DIRECTOR_DATABASE_USERNAME,
    password: process.env.DIRECTOR_DATABASE_PASSWORD,
    database: process.env.DIRECTOR_DATABASE_NAME
  })

module.exports.run_setup = function(app){
    app.use(cookieSession({name: "google-cookie", keys: ['googleauthKey', 'secretionauthKey', 'superduperextrasecretcookiegoogleKey'], maxAge: 1000*60*30}))

    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        done(null, id)
    });
    
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: google_redirect_uri
    },
    function(accessToken, refreshToken, profile, cb) {
        //console.log(res.locals.userProfile)
        return cb(null, profile);
  }
));
    
    app.get("/jebchess/login", passport.authenticate("google", {scope: ["profile", "email"]}));
    
    app.get('/jebchess', function(req, res){
        res.render('jebchesslogin.hbs', {})
    })
    
    app.get('/jebchess/play', function(req, res){
        if (userProfile !== ""){
            console.log(req.user) 
            res.render('jebchess.hbs', {}) 
        }
        else{
            res.redirect('/jebchess/login')
        }
    })
    
    app.get('/jebchess/logout', function(req, res){
        res.redirect('/jebchess')//TODO
    })
    
    function getquerydata(str){
        let getidsql = str
        return database.query(getidsql)
    }

    app.get('/jebchess/login_helper', passport.authenticate("google"), async (req,res)=>{
        userProfile = req.user
        let results = await getquerydata("SELECT id FROM chess_players")
        let newUser = true
        console.log("results: ", results)
        for (let x=0; x<results.length; x++){
            console.log(results[x].id, " --- ", req.user.id)
            if (results[x].id === req.user.id){
                newUser = false
                break;
            }
        }
        
        //insert new user into chess_players ONLY IF they aren't in chess_players
        if (newUser){
            userData = {personal:{}, chess:{}}
            userData.personal.id = req.user.id
            userData.personal.name = req.user.displayName
            userData.personal.email = req.user.emails[0].value
            userData.chess.games_won = 0
            userData.chess.games_lost = 0
            var sql = "INSERT INTO chess_players (id, name, data) VALUES (\'"+req.user.id+"\', \'"+req.user.displayName+"\', \'"+JSON.stringify(userData)+"\')";
            console.log(sql)
            await database.query(sql)
        }
        res.redirect('/jebchess/play')
    });
}