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
var connection = mysql.createConnection( 
  {
    host: process.env.DIRECTOR_DATABASE_HOST,
    user: process.env.DIRECTOR_DATABASE_USERNAME,
    password: process.env.DIRECTOR_DATABASE_PASSWORD,
    database: process.env.DIRECTOR_DATABASE_NAME
  }
)

module.exports.run_setup = function(app){
    app.use(cookieSession({name: "google-cookie", keys: ['googleauthKey', 'secretionauthKey', 'superduperextrasecretcookiegoogleKey']}))

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
        if (userProfile === ""){
            res.redirect('/jebchess')
        }
        console.log(res.locals.userProfile)
        res.render('jebchess.hbs', {})
    })
    
    app.get('/jebchess/logout', function(req, res){
        delete req.session.authenticated
        res.redirect('/ionauthcookie?reset=true')//TODO
    })

    app.get('/jebchess/login_helper',passport.authenticate("google"),(req,res)=>{
        userProfile = req.user
        res.redirect('/jebchess/play')
    });
}