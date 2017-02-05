var express = require('express');
var router = express.Router();
var Book  = require('../models/books');
/* GET home page. */
router.get('/:id', function(req, res, next) {
  //특정 가게의 예약목록 id값
  Book.find({id:req.params.id}, function(err, reservation){
    if(err) {
      return res.status(500).json({error: err});
    }else{
      var array = [];
      for(var i = 0; i < reservation.length; i++) {
        array.push(reservation[i]);
      }
      var result = {
        result : array
      }
        console.log(result);
        res.send(result);
    }
   });
});
router.get('/me/:email', function(req, res, next) {
  //특정 가게의 예약목록
  Book.find({email:req.params.email}, function(err, reservation){
    if(err) {
      return res.status(500).json({error: err});
    }else{
      var array = [];
      for(var i = 0; i < reservation.length; i++) {
        array.push(reservation[i]);
      }
      var result = {
        result : array
      }
        console.log(result);
        res.send(result);
    }
   });
});
router.post('/',function(req,res){
  var newBook = new Book();
  newBook.email = req.body.email;
  newBook.store_name = req.body.store_name;
  newBook.phone = req.body.phone;
  newBook.location =req.body.location;
  newBook.x =req.body.x;
  newBook.y =req.body.y;
  newBook.images =req.body.images;
  newBook.save(function(err){
    if(err){
      console.log(err);
      return res.status(500).json({ error: 'database failure'});;
    }
    console.log("성공");
  });
});

module.exports = router;
