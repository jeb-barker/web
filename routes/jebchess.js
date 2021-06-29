var https = require('https');



module.exports.run_setup = function(app){
    
    
    
    app.get('/jebchess', function (req, res) {
        res.render('jebchess.hbs', {})
    })
}