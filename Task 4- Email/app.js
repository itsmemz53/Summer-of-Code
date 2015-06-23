var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var monk = require('monk');
var db = monk('localhost:27017/');

//var flash    = require('connect-flash');



function findByUsername(username, fn) {
  var collection = db.get('loginUsers');
collection.findOne({username:username},{},function(e,docs){
  console.log("now in user" ,docs);
    if(docs)
    {
      return fn(null,docs);
    }
    else {
      return fn(null,null);
    }

});
}
function findForInbox(res,email){
  var collect=db.get("emails");
  collect.find({to:email},{},function(e,docs){
    console.log("now in inbox",docs);
    if(docs)
    {
       sendData(res,docs);
    }
    else 
    {
      return null;
    }
  });

}


function findforSent(res,email){
  var collect=db.get("emails");
  collect.find({from:email},{},function(e,docs){
    console.log("now in sent",docs);
    if(docs)
    {
       sendData(res,docs);
    }
    else 
    {
      return null;
    }
  });

}



function findById(id, fn) {
    var collection = db.get('loginUsers');
collection.findOne({_id:id},{},function(e,docs){
console.log("now in id",docs);
if(docs)
{
  return fn(null,docs);
}
else 
{
  return fn(null,null);
}
});
}


var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// configure Express
app.use(cookieParser());
//app.use(express.methodOverride());
app.use(session({
  
  secret: 'keyboard cat'
  //resave: true,
  //saveUninitialized: true,
  //cookie : { secure : false, maxAge : (40 * 60 * 60 * 1000)}, // 4 hours
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    req.db = db;
    next();
})


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Find the user by username.  If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure and set a flash message.  Otherwise, return the
    // authenticated `user`.
    findByUsername(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
      if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
      return done(null, user);
    })
  }
));







// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
//app.use(flash());
app.use(express.static(__dirname + '/public'));


app.get('/inbox', ensureAuthenticated, function(req, res){
  var obj=findForInbox(res,req.user.email);
  console.log("checking object",obj);
});
function sendData(res,obj)
{
  console.log("finally checking object",obj);
  res.send(obj);
}

app.get('/account', ensureAuthenticated, function(req, res){
  res.send(req.user);

});

app.get('/login', function(req, res){
  res.send("login karrrlo!")
});



app.get('/sent', ensureAuthenticated, function(req, res){
  var obj=findforSent(res,req.user.email);
  console.log("checking object",obj);
});

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login'}),
  function(req, res) {
   

    res.redirect('/inbox.html');
  });

app.post('/create',function(req,res){
var collection = req.db.get("loginUsers");

    // Submit to the DB
    collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect("/");
        }
    });

  })

app.post('/email',function(req,res){
var collection = req.db.get("emails");
        
      
      var from=req.user.email;
      var to=req.body.to;
      var message=req.body.message;
      var subject=req.body.subject;
      var timestamp=new Date().getTime();
      var temp={'to':to,'from':from,'message':message,'subject':subject,'timestamp':timestamp};
      console.log(temp);
    collection.insert(temp, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect("/inbox.html");
        }
    });

  })

  
// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
/*
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
*/

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3030);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
 return next(); }
  res.redirect('/login');
}