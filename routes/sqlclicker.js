var cookieSession = require('cookie-session')
const {AuthorizationCode} = require('simple-oauth2');
var https = require('https');
var mysql = require('mysql');
var connection = mysql.createConnection( 
  {
    host: process.env.DIRECTOR_DATABASE_HOST,
    user: process.env.DIRECTOR_DATABASE_USERNAME,
    password: process.env.DIRECTOR_DATABASE_PASSWORD,
    database: process.env.DIRECTOR_DATABASE_NAME
  }
)

var options = { headers : { 'User-Agent' : 'request' } } ;
const OAUTH_SCOPE = 'read';

var ion_client_id     = 'Rev197ZRHOebuX20NappOgmWeWgArB4xwMlE0iXp';
var ion_client_secret = 'gnc7Hctn6zQKqL1e9NNqRDsKhrAgzQjhVcm2AnMwyiHoUvMMV3O0o6rA3DDIIg9hhUku444BwVuGukcyK9YxXH7vHfq1VctFeTMsWQBDCDuWH6n6FPC05WUCGh1Jhu6k';
var ion_redirect_uri  = 'https://localhost:8080/sql_login_helper';

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
    app.use(cookieSession({name: "sql-cookie", keys: ['sqlauthKey', 'secretsqlKey', 'superduperextrasecretcookiesqlKey']}))

    function check_auth(req, res, next){
        if('authenticated' in req.session){
            next()
        }
        else{
            res.render('sqlclicker.hbs', {'auth-link': authorizationUri, 'auth': false})
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
                let obj = JSON.parse(dat)
                console.log(JSON.stringify(obj))
                res.locals.profile = obj.id
                connection.connect(function(err){
                    if(err) throw err
                    let sql = "SELECT id,fname,visitcount FROM sql_clicker WHERE id=" + obj.id
                    connection.query(sql, function(err, results, fields){
                        if(err) throw err
                        if(results.length === 0){
                            let insertsql = "INSERT INTO sql_clicker id,fname,visitcount VALUES "+ obj.id+","+obj.first_name+","+0
                            connection.query(insertsql, function(err, results, fields){
                                if(err) throw err
                                next()
                            })
                        }
                        else{
                            next()
                        }
                    })
                })
                connection.end()
                next()
            })
        }).on('error', function(error){
            console.log(error.message)
            next(error)
        })
    }
    
    app.get('/sqlclicker', [check_auth, check_refresh, getUserName],  function(req, res){
        let profile = res.locals.profile;
        
        if('reset' in req.query){
            connection.connect(function(err){
                if(err) throw err
                let sql = "UPDATE sql_clicker SET visitcount=0 WHERE id=" + profile
                connection.query(sql, function(err, results, fields){
                    
                })
            })
            connection.end()
        }
        var obj = {}
        connection.connect(function(err){
            if(err) throw err
            let sql = "SELECT id,fname,visitcount FROM sql_clicker WHERE id=" + profile
            connection.query(sql, function(err, results, fields){
                obj = JSON.parse(JSON.stringify(results[0]))
            })
        })
        connection.end()
        
        obj.visitcount += 1
        connection.connect(function(err){
            if(err) throw err
            let sql = "UPDATE sql_clicker SET visitcount="+obj.visitcount+" WHERE id=" + profile
            connection.query(sql, function(err, results, fields){
                
            })
        })
        connection.end()
        obj.auth = true
        res.render('sqlclicker.hbs', obj)
    })
    
    app.get('/sqlclicker/logout', function(req, res){
        delete req.session.authenticated
        res.redirect('/sqlclicker?reset=true')
    })

    async function codeToToken(req, res, next){
        console.log('in code to token')
        let code = req.query.code
        
        let options = {
            'code': code,
            'redirect-uri': ion_redirect_uri,
            'scope': OAUTH_SCOPE
        }

        try{
            let access_token = await client.getToken(options)
            console.log('a-t: ', access_token)
            res.locals.token = access_token.token
            next()
        }
        catch(error){
            console.log('Access Token Error: ', error.message)
            res.send(503)
        }
    }

    app.get('/sql_login_helper', [codeToToken], function(req, res){
        req.session.authenticated = true
        req.session.token = res.locals.token
        
        res.redirect('/sqlclicker')
    })
}