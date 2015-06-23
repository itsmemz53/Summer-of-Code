var port = 3030;
/////////
var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/public'));
var monk = require('monk');
var db = monk('localhost:27017/login');
// Make our db accessible to our router
app.use(function(req,res,next){
                      req.db = db;
                      next();
                              });
app.all('*', function(req, res, next) {
                      res.header('Access-Control-Allow-Origin', req.headers.origin);
                      res.header('Access-Control-Allow-Credentials', true);
                      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
                      res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    
                      next();
});

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.get("/data", function(req,res,next){
	//console.log("/");
  //get data
                    var collection = req.db.get('messagescollection');
                    collection.find({},{},function(e,docs){
                    console.log(docs);
                    res.send(docs);
                                        });

                        });

var server = app.listen(port, function () {

                  var host = server.address().address;
                  var port = server.address().port;
                  console.log('Listening at http://%s:%s', host, port);

                                    });
   
  app.post("/*",jsonParser,function(req,res){
    // Set our collection
  var collection =req.db.get('messagescollection');

    // Submit to the DB
  collection.insert(req.body, function (err, doc) {
      if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");

}
});

 console.log(req.body);
});



   // status: "200",
        //msg: "OK",
        //timestamp: new Date().getTime(),
        //description:"Simple Server."