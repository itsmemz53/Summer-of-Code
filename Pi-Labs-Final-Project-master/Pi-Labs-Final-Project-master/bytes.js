/**
 * Created by Mohammad on 7/24/2015.
 */
var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;

var port = process.env.PORT || 3030;

var dburl = "localhost:27017/blogdb";
var request = require('request');
var cheerio = require('cheerio');
var S = require('string');

var db = require('monk')('umer:1234@ds061318.mongolab.com:61318/dropped');


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var samsung = "Bytessamsungcollection";
var apple = "Bytesapplecollection";
var qmobile = "Bytesqmobilecollection";
var htc = "Byteshtccollection";



var samsungStorage = [];
var appleStorage = [];
var htcStorage = [];
var qmobileStorage = [];

var samungPhone="samsung";
var applePhone="apple";
var qmobilePhone="qmobile";
var htcPhone="htc"
var sam="Samsung"
var appl="Apple"
var qmob="QMobile"
var ht="HTC";
var page;
//getProducts(samungPhone,samsung,sam);
//getProducts(applePhone,apple,appl);
//getProducts(qmobilePhone,qmobile,qmob);
//getProducts(htcPhone,htc,ht);

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

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});
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
    });
  }
));

app.use(express.static(__dirname + '/dropped/www'));


/*app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/loginFailure'}),
  function(req, res) {
   

    res.send({sucess:true});
  });
app.get('/loginFailure', function(req, res){
  res.send({error:true})
});

app.post('/register',function(req,res){
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

  });*/

function fetchProductsFromDB(collectionName, res ){
  var collect=db.get(collectionName);
  collect.find({},{},function(e,docs){
    console.log(collectionName,docs);
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
function findProduct(res,ind,collectionName){
  var collect=db.get(collectionName);
  console.log("ind ko check kr rha !",ind);
  collect.findOne({_id:ind},{},function(e,docs){
    console.log("Product",docs);
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
/*app.get('/logout', function(req, res){
  req.logout();

 // res.redirect("/#/blog");
  
});*/


app.get('/getBytesSamsung', function(req, res){
  var obj=fetchProductsFromDB("Bytessamsungcollection",res);
  console.log("checking object",obj);
});

app.get('/getBytesSamsung/*', function(req, res){

  console.log("quer id",req.params[0]);
  var abc=req.params[0];

  if(abc)
  {
    var obj=findProduct(res,req.params[0],"Bytessamsungcollection");
  }
  else {
  res.send({error:true})
  }
});

app.listen(port);

function sendData(res,obj)
{
  console.log("finally checking object",obj);
  res.send(obj);
}
/*
function ensureAuthenticated(req, res, next) 
{
  if (req.isAuthenticated()) {
 return next(); }
  res.redirect("/#/login");
}

*/


function getProducts(brand_id, storage,match) {
    var page = 1;
    // var obj;

  var collection =  db.get(storage);
 collection.remove({});

    var clear = setInterval(function () {
        request("http://www.bytes.pk/"+brand_id+"/?sort=newest&page="+page, function (error, response, html) {
            if (error) {
                console.log('error');
            } else if (!error && response.statusCode == 200) {
                console.log("request executed");
                   
                
                    console.log("entered else");
                    page++;
                    var $ = cheerio.load(html);
                    //console.log(html)
                    var link, imgLink, name, price,brand,temp;
                    var arr=[];

					
                    $('.Odd').each(function (index, element) {
                        var elem = $(this);

                       

                        link = elem.find('.ProductImage');
                        link=link.find('a').attr('href');
                        imgLink = elem.find('img').attr('src');
                        name = elem.find('.ProductDetails a').text();
                        price = elem.find('.p-price').text();
                        arr=price.split(" ");
                        
                       // price=S(price).contains('strike').s
                        //price =S(price).stripRight('</strike>').s
                        //arr[0]=price;

                        //console.log(price);
                      var obj = {
                            productName: name,
                            productPrice: price,
                            productImg: imgLink,
                            productLink: link
                        };
                        //console.log(name);
                        if(price.search(" ")>1){
                            price=arr[1];
                      
                        }
                        else{
                            price=arr[0]
                            
                        }
                        console.log(price)
                       // console.log(imgLink);
                        //console.log(link);
                      // storage.push(obj);
                     
                      // console.log("\n")
      					//console.log(price);
      					if(imgLink!=null){
                        collection.insert({
                            productName: name,
                            productPrice: price,
                            productImg: imgLink,
                            productLink: link
                        });
                    }
                    else{
                    console.log("exiting...");
                    console.log(storage);
                    clearInterval(clear);
                    
                    }

  					
                    
                    });
                }
                  

        });
    }, 10000);
return 0;
}





