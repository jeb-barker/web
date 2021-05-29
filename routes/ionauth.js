var cookieSession = require('cookie-session')
const {AuthorizationCode} = require('simple-oauth2');
var https = require('https');

var options = { headers : { 'User-Agent' : 'request' } } ;

var ion_client_id     = 'Rev197ZRHOebuX20NappOgmWeWgArB4xwMlE0iXp';
var ion_client_secret = 'gnc7Hctn6zQKqL1e9NNqRDsKhrAgzQjhVcm2AnMwyiHoUvMMV3O0o6rA3DDIIg9hhUku444BwVuGukcyK9YxXH7vHfq1VctFeTMsWQBDCDuWH6n6FPC05WUCGh1Jhu6k';
var ion_redirect_uri  = 'https://jbarkerwebdev.sites.tjhsst.edu/login_helper';

var client = new AuthorizationCode(
    {
        client:
        {
            id: ion_client_id,
            secret: ion_client_secret,
        },
        auth:
        {
            tokenHost: 'https://ion.tjhsst.edu/oauth/',
            authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
            tokenPath: 'https://ion.tjhsst.edu/oauth/token/'
        }
    });

var authorizationUri = client.authorizeURL({
    scope: 'read',
    redirect_uri: ion_redirect_uri
});

module.exports.run_setup = function(app){
    app.use(cookieSession({name: "ionauth-cookie", keys: ['ionauthKey', 'secretionauthKey', 'superduperextrasecretcookieKey']}))

    app.get('/ionauthcookie', [check_auth, check_refresh, getUserName], function(res, req){
        var profile = res.locals.profile;
        var first_name = profile.first_name;
        res.render('cookieauth.hbs', {'name': first_name, 'auth': true})
    })

    function check_auth(req, res, next){
        if('authenticated' in req.session){
            next()
        }
        else{
            res.render('cookieauth.hbs', {'auth-link': authorizationUri, 'auth': false})
        }
    }

    async function check_refresh(req, res, next){
        let accessToken = client.createToken(req.session.token)
        if(accessToken.expired()){
            try{
                const refreshParams = {
                    'scope': OAUTH_SCOPE
                }
                req.session.token = await accessToken.refresh(refreshParams);
            }
            catch(error){
                console.log('Refresh Error: ', error.message)
                return;
            }
        }
        next()
    }

    function getUserName(req, res, next){
        var access_token = req.session.token.access_token;
        var profile_url = 'https://ion.tjhsst.edu/api/profile?format=json&access_token=' + access_token;
        
        https.get(profile_url, function(response){
            let dat = ""
            response.on('data', function(chunk){
                dat += chunk
            })
            response.on('end', function(){
                res.locals.profile = JSON.parse(dat)
                next()
            })
        }).on('error', function(error){
            console.log(error.message)
            next(error)
        })
    }

    async function codeToToken(req, res, next){
        let code = req.query.code
        let options = {
            'code': code,
            'redirect-uri': ion_redirect_uri,
            'scope': OAUTH_SCOPE
        }

        try{
            let access_token = await client.getToken(options)
            res.locals.token = access_token.token
            next()
        }
        catch(error){
            console.log('Access Token Error: ', error.message)
            res.send(502)
        }
    }

    app.get('/login_helper', [codeToToken], function(req, res){
        req.session.authenticated = true
        req.session.token = res.locals.token
        
        res.redirect('/ionauthcookie')
    })
}