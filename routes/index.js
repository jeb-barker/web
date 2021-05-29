var dcf = require('./dogcatfish.js');
var facts = require('./facts.js');
var css = require('./css.js');
var apod = require('./apod.js');
var weather = require('./weather.js');
var cookie = require('./cookie-session.js')
var ionauthcookie = require('./ionauth.js')

module.exports.do_setup = function(app){
    dcf.run_setup(app);
    facts.run_setup(app);
    css.run_setup(app);
    apod.run_setup(app);
    weather.run_setup(app);
    cookie.run_setup(app);
    ionauthcookie.run_setup(app);
}