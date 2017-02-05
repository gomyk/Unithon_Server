var express = require('express');
var router = express.Router();

// 예약하기
router.post('/', function(req, res, next) {
  var user_id = req.body.user_id;
  var shop_id = req.body.shop_id;
  var book_time = req.body.book_time; // 시작시간을 주면 1시간만 예약을 할 수 있도록
  // 수용인원 이런 것도 받아봐야겠네
  // Airbnb 의 와이파이나 이런 정보도 받아와야겠네 - PC 은 컴퓨터 성능과 같은 특수 상황

  res.json({
    "success" : 1,
    "message" : "예약이 완료되었습니다.",
    "result" : {
      message: "상점이 정상적으로 등록되었습니다"
    }
  })
});

// 예약 상세 보기
router.get('/:book_id', function(req, res, next) {
  var book_id = req.params.book_id;
  var fakeData = {
    "shop_id" : 1,
    "shop_name" : "로컬리 커피",
    "address" : "서울시 강남구 34-2",
    "image_url" : "http://cfile28.uf.tistory.com/image/2574F033569762CF2882E1"
  };

  res.json({
    "success" : 1,
    "message" : "예약내역입니다.",
    "result" : {
      shop : fakeData
    }
  });
});


module.exports = router;
