var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var Store = require('../models/stores');

var router = express.Router();
var client_id = '3lidda3OUe2AapX8rUMC';
var client_secret = 'ELdoU2m3wu';
/* GET home page. */
router.get('/', function(req, res, next) {

  for(var a=1;a<4;a++){
    var url = 'http://www.diningcode.com/list.php?page='+a+'&chunk=10&query=%EC%84%A0%EB%A6%89%EC%97%AD+%EC%B9%B4%ED%8E%98';
    // var url = "http://www.mfds.go.kr/index.do?mid=726&pageNo=31";
    console.log(req.params.location);
    request(url,function(error,response,html){
      if(error){
        throw error;
      }
    //  console.log(html);
      var $ = cheerio.load(html);

      var list = $("#search_list").find('dc-restaurant');
      console.log(list.length);

      for(var i=0;i<list.length;i++){
        var split = $(list[i]).find('dc-rimage').attr('data-image');
        var name = $(list[i]).find('.dc-restaurant-name').children().text();
        var cat = $(list[i]).find('.dc-restaurant-category').text();

        var loc_arr = $(list[i]).find('.dc-restaurant-info-text');
        var loc = $(loc_arr[1]).text();
        var phone =  $(loc_arr[2]).text();
        var arr = loc.split("·");
        loc = arr[1];
        console.log('가게명 : ',name);
        console.log('카테고리: ',cat);
        console.log('장소: ',loc);

        var arr = split.split(",");
        var in_arr =[];
        for(var k=0;k<5;k++){
          in_arr.push(arr[k]);
        }
        console.log('사진 : ',arr[0]);
        var newStore = new Store();
      //  newStore.id = n;
        newStore.store_name = name;
        newStore.owner_name = "김문원";
        if(loc == undefined){
          newStore.location = '남구로역 5번출구';
        }else{
            newStore.location =loc;
        }

        newStore.x =11111;
        newStore.y =11111;
        newStore.phone =phone;
        newStore.open_time ="09:00:00";
        newStore.close_time ="19:00:00";
        newStore.extra =cat;
        newStore.images =in_arr;
        var check = true;
        for(var c = 0;c<5;c++){
          if(in_arr[c] == null){
            check = false;
          }
        }
        if(check){
          newStore.save(function(err){
            if(err){
              console.log(err);
              return res.status(500).json({ error: 'database failure'});;
            }
            console.log("성공");
          });
        }

      }
    });
  }
});
router.get('/gonaver', function(req, res, next){
  Store.findOne({x:11111},function(err, shops){
    if(err) {
      return res.status(500).json({error: err});
    }else{
    //  var array = [];
}
if(shops == undefined){
  //console.log("undefined다");
}else{
      var api_url = 'https://openapi.naver.com/v1/map/geocode?query=' + encodeURI(shops.location); // json
       //var api_url = 'https://openapi.naver.com/v1/map/geocode.xml?query=' + encodeURI(req.query.query); // xml
       var request = require('request');
       var options = {
           url: api_url,
           headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
        };
        //console.log(shops[i].id);
       var shop_id = shops.id;
       request.get(options, function (error,response, body) {
         if (!error && response.statusCode == 200) {
           //res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
           var parsedBody = JSON.parse(body);
           var X = parsedBody.result.items[0].point.x;
           var Y = parsedBody.result.items[0].point.y;
           console.log(X, Y);
           //console.log(shops[i]);
           Store.findOne({id:shop_id}, function(err, store){
                // if(err) return res.status(500).json({ error: 'database failure' });
                 //if(!store) return res.status(200).json({ error: 'book not found' });
                  store.x = X;
                  store.y = Y;
                  console.log(shop_id,'에 넣엇다');
                  store.save(function(err){
                     if(err) res.status(500);
                     //res.json({message: 'book updated', output: book});
                 });
             });
           //res.send(output);
         } else {
           //res.status(response.statusCode).end();
           Store.findOne({id:shop_id}, function(err, store){
                // if(err) return res.status(500).json({ error: 'database failure' });
                 //if(!store) return res.status(200).json({ error: 'book not found' });
                  store.x = 22222;
                  store.y = 22222;
                  console.log(shop_id,'에 2222를 넣엇다');
                  store.remove();
             });
         }
       });
    //  res.send(result);
    }

   });
});

module.exports = router;
