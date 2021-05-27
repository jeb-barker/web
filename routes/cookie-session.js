var cookieSession = require('cookie-session')

module.exports.run_setup = function(app){
    app.use(cookieSession({name: "cookie-clicker-cookie", keys: ['cookieKey', 'secretcookieKey', 'superduperextrasecretcookieKey']}))

    app.get('/cookieclicker', function(req, res){
        if('reset' in req.query || !('vc' in req.session)){
            req.session.vc = 0
        }
        req.session.vc += 1
        obj = {}
        obj.vc = req.session.vc
        res.render('cookie.hbs', obj)
    })
}