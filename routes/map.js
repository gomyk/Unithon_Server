var express = require('express');
var router = express.Router();
var Store = require('../models/stores');

var client_id = '3lidda3OUe2AapX8rUMC';
var client_secret = 'ELdoU2m3wu';
/* GET home page. */
router.get('/', function(req, res, next) {

});

router.post('/',function(req,res){

    Store.find({}, function(err, store){
      if(err) {
        return res.status(500).json({error: err});
      }else{
        var array = [];
        for(var i = 0; i < store.length; i++) {
          array.push(store[i]);
        }
        var result = {
          result : array
        }
        //  console.log(result);
          res.send(result);
      }
     });
});
router.post('/one',function(req,res){
  Store.find({id:req.body.id}, function(err, store){

    if(err) {
      return res.status(500).json({error: err});
    }else{
      console.log("dssdfdsf");
      console.log(store);
      var array = [];
      for(var i = 0; i < store.length; i++) {
        array.push(store[i]);
      }
      var result = {
        result : array
      }
        //console.log(result);
        res.send(result);
    }
   });
});
router.post('/:id',function(req,res){
    Store.find({id:req.params.id}, function(err, store){
      if(err) {
        return res.status(500).json({error: err});
      }else{
        var array = [];
        for(var i = 0; i < store.length; i++) {
          array.push(store[i]);
        }
        var result = {
          result : array
        }
          //console.log(result);
          res.send(result);
      }
     });
});
router.post('/convert',function(req,res){
  //  var api_url = 'https://openapi.naver.com/v1/map/geocode?query=' + encodeURI(req.query.query); // json
    var api_url = 'https://openapi.naver.com/v1/map/geocode?query=' + encodeURI(req.body.address); // json
     //var api_url = 'https://openapi.naver.com/v1/map/geocode.xml?query=' + encodeURI(req.query.query); // xml
     var request = require('request');
     var options = {
         url: api_url,
         headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
      };
     request.get(options, function (error, response, body) {
       if (!error && response.statusCode == 200) {
         //res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
         console.log(body);
         var output = JSON.parse(body);
         res.send(output);
       } else {
         //res.status(response.statusCode).end();
         console.log('error = ' + response.statusCode);
       }
     });


});

module.exports = router;
