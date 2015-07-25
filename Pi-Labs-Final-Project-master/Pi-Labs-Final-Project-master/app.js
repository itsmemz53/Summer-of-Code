/**
 * Created by Umer on 7/22/2015.
 */

//    Requiring the modules
var request = require('request');
var cheerio = require('cheerio');
var db = require('monk')('umer:1234@ds061318.mongolab.com:61318/dropped');
var port = process.env.PORT || 3030;
// Homeshopping producs IDs
var express = require('express')
var APPLE_ID = 227;
var SAMSUNG_ID = 30;
var HTC_ID = 29;
var QMOBILE_ID=269;

//Collection names

var samsung = "samsungcollection";
var apple = "applecollection";
var qmobile = "qmobilecollection";
var htc = "htccollection"

//http://www.daraz.pk/phones/"+brand_id+"/?pathInfo=phones%2F"+brand_id+"&page="+page


// arrays to store fetched data of the products

var samsungStorage = [];
var appleStorage = [];
var htcStorage = [];
var qmobileStorage = [];

getProducts(SAMSUNG_ID, samsung);
getProducts(APPLE_ID, apple);
getProducts(HTC_ID, qmobile);
getProducts(QMOBILE_ID, htc);
var app = express();



app.use(function(req,res,next){
    req.db = db;
    next();
})

app.use(express.static(__dirname + '/public'));




function getProducts(brand_id, storage) {
    var page = 1;

    var collection =  db.get(storage);
   collection.remove({});

    var clear = setInterval(function () {
        request("http://homeshopping.pk/categories/Mobile-Phones-Price-Pakistan/?page=" + page.toString() + "&sort=newest&brandid=" + brand_id + "&AjaxRequest=1", function (error, response, html) {
            if (error) {
                console.log('error');
            } else if (!error && response.statusCode == 200) {
                console.log("request executed");

                if (html != "") {
                    console.log("entered else");
                    page++;
                    var $ = cheerio.load(html);

                    var link, imgLink, name, price;


                    $('li').each(function (index, element) {

                        var elem = $(this);

                        link = elem.find('.ProductImage a').attr('href');
                        imgLink = elem.find('.ProductImage img').attr('src');
                        name = elem.find('.ProductDetails a').text();
                        price = elem.find('.ProductPriceRating em').text();

                        //var obj = {
                        //    productName: name,
                        //    productPrice: price,
                        //    productImg: imgLink,
                        //    productLink: link
                        //};
                        //storage.push(obj);
                        collection.insert({
                            productName: name,
                            productPrice: price,
                            productImg: imgLink,
                            productLink: link
                        });
                    });

                } else {
                    console.log("exiting...");
                    console.log(storage);
                    clearInterval(clear);
                }


            }


        });


    }, 10000);
}

app.listen(port);










