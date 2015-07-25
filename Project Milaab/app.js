var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;

var port = process.env.PORT || 3030;

var dburl = "localhost:27017/blogdb";

if (process.env.PORT)
  dburl = "admin:password@ds053380.mongolab.com:53380/blogdb";

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var monk = require('monk');
var db = monk(dburl);

//var flash    = require('connect-flash');

/*
* You may think you know what the following code does.
* But you don't. Trust me.
* Fiddle with it, and you'll spend many a sleepless
* night cursing the moment you thought you'd be clever
* enough to "optimize" the code below.
* Now close this file and go play with something else.
*/


function findByUsername(username, fn) {
  var collection = db.get('loginUsers');
  console.log("yeh user name hai latest!!",username);
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


function findforBlogs(res){
  var collect=db.get("blogs");
  collect.find({},{},function(e,docs){
    console.log("Blogs",docs);
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

function findBlog(res,ind){
  var collect=db.get("blogs");
  console.log("ind ko check kr rha !",ind);
  collect.findOne({_id:ind},{},function(e,docs){
    console.log("Blogs",docs);
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
    console.log(username,password);
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



function sendData(res,obj)
{
  console.log("finally checking object",obj);
  res.send(obj);
}



app.get('/login', function(req, res){
  res.send({msg:"login kr"});
});



app.get('/sent', ensureAuthenticated, function(req, res){
  var obj=findforSent(res,req.user.email);
  console.log("checking object",obj);
});


app.get('/blogs', function(req, res){
  var obj=findforBlogs(res);
  console.log("checking object",obj);
});

app.get('/blogs/*', ensureAuthenticated, function(req, res){
  console.log("mubeen ki khaatir:D");
  console.log("quer id",req.params[0]);
  var abc=req.params[0];

  if(abc)
  {
    var obj=findBlog(res,req.params[0]);
  }
  else {
  res.send({error:true})
  }
});

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/loginFailure'}),
  function(req, res) {
   

    res.send({sucess:true});
  });
app.get('/loginFailure', function(req, res){
  res.send({error:true})
});

app.post('/signup',function(req,res){
var collection = req.db.get("loginUsers");
var mail=req.body.email;            
collection.findOne({email:mail},{},function(e,docs2){
  console.log("checking docs 2",docs2);
    if(docs2)
    {
      var obj=('<a href="register.html">Go back</a>');
       res.send("This email id is already present in the database "+obj);
    }
    else 
    {
      var id=req.body.username;
      
      collection.findOne({username:id},{},function(e,docs3){
        if(docs3)
        {
          var obj=('<a href="register.html">Go back</a>');
       res.send("This user id is already present in the database "+obj);
        }
        else
        {
            console.log("pushing in the database!!!");
            collection.insert(req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect("/");
        }
        });
      }
    });

    }
  });


    // Submit to the DB


    

  });



/*
* You may think you know what the following code does.
* But you don't. Trust me.
* Fiddle with it, and you'll spend many a sleepless
* night cursing the moment you thought you'd be clever
* enough to "optimize" the code below.
* Now close this file and go play with something else.
*/

app.post('/newBlog',ensureAuthenticated, function(req,res){
var collection = req.db.get("blogs");
        
      
      var title=req.body.ptitle;
      var subtitle=req.body.subtitle;
      var author=req.body.author;
      var post=req.body.post;
      var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

var newdate = year + "/" + month + "/" + day;
      var temp={'ptitle':title,'subtitle':subtitle,'author':author,'post':post,'date':newdate};
      console.log(temp);
    collection.insert(temp, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send({error:true});
        }
        else {
            res.send({msg:"success"});
        }
    });

  })

app.get('/logout', function(req, res){
  req.logout();

  res.redirect("/#/blog");
  
});

app.listen(port);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) 
{
  if (req.isAuthenticated()) {
 return next(); }
  res.redirect("/#/login");
}
