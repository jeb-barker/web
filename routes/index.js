var dcf = require('./dogcatfish.js');
var facts = require('./facts.js');
var css = require('./css.js');

module.exports.do_setup = function(app){
    dcf.run_setup(app);
    facts.run_setup(app);
    css.run_setup(app);
}