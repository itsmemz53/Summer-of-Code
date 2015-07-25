/**
 * Created by Mohammad on 7/24/2015.
 */

var request = require('request');
var cheerio = require('cheerio');
var S = require('string');

var db = require('monk')('umer:1234@ds061318.mongolab.com:61318/dropped');
var port = process.env.PORT || 3030;

var samsung = "Darazsamsungcollection";
var apple = "Darazapplecollection";
var qmobile = "Darazqmobilecollection";
var htc = "Darazhtccollection"



var samsungStorage = [];
var appleStorage = [];
var htcStorage = [];
var qmobileStorage = [];

var samungPhone="samsung";
var applePhone="apple";
var qmobilePhone="qmobile"
var sam="Samsung"
var appl="Apple"
var qmob="QMobile"
var page;
getProducts(samungPhone,samsung,sam);
getProducts(applePhone,apple,appl);
getProducts(qmobilePhone,qmobile,qmob);
function getProducts(brand_id, storage,match) {
    var page = 1;
    // var obj;

  var collection =  db.get(storage);
 collection.remove({});

    var clear = setInterval(function () {
        request("http://www.daraz.pk/phones/"+brand_id+"/?pathInfo=phones%2F"+brand_id+"&page="+page, function (error, response, html) {
            if (error) {
                console.log('error');
            } else if (!error && response.statusCode == 200) {
                console.log("request executed");
                   
                
                    console.log("entered else");
                    page++;
                    var $ = cheerio.load(html);
                    //console.log(html)
                    var link, imgLink, name, price,brand;

					
                    $('.itm-link').each(function (index, element) {
                        var elem = $(this);
                        link=$(this).attr('href');
                        //console.log(elem);
                        //link = elem.find('.itm-link a').attr('href');
                        imgLink = elem.find('.itm-img').attr('src');
                        name = elem.find('.itm-title').text();
                       name= S(name).collapseWhitespace().s
                       brand=elem.find('.itm-brand').text();
                        price = elem.find('.mrs').text();
                        price =  S(price).collapseWhitespace().s;
                      var obj = {
                            productName: name,
                            productPrice: price,
                            productImg: imgLink,
                            productLink: link
                        };

                      // storage.push(obj);
                     
                      // console.log("\n")
      					//console.log(price);
      					if(brand === match){
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
}

