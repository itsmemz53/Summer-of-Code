var request = require('request');
var cheerio = require('cheerio');
var value="1";
var loop=true;
var  url = 'http://homeshopping.pk/categories/Mobile-Phones-Price-Pakistan/?page='+value+'&sort=newest&brandid=227&AjaxRequest=1';
function myFunc()
request(, function (error, response, html) {
  loop=false;
  if(html === ""){
    loop=false;    
  }
  else{
    value ++ ;
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);

    console.log(html);
  }
}
});
};