var express = require('express');
var router = express.Router();
var Store = require('../models/stores');
// 예약상점 리스트
router.get('/', function(req, res, next) {

});

// 예약상점 디테일
router.get('/:shop_id', function(req, res, next) {

});

// 예약상점 등록
router.post('/', function(req, res, next) {
  var newStore = new Store();
  newStore.id = req.body.id;
  newStore.store_name = req.body.store_name;
  newStore.owner_name = req.body.owner_name;
  newStore.location =req.body.location;
  newStore.x =req.body.x;
  newStore.y =req.body.y;
  newStore.phone =req.body.phone;
  newStore.open_time =req.body.open_time;
  newStore.close_time =req.body.close_time;
  newStore.extra =req.body.extra;
  newStore.images =req.body.images;
  newStore.save(function(err){
    if(err){
      console.log(err);
      return res.status(500).json({ error: 'database failure'});;
    }
    console.log("성공");
  });
});

module.exports = router;
