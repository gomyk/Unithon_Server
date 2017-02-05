var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(200);
});

router.post('/',function(req,res){
  var token = req.body.token;
  var image;
  var email;
  console.log('token' ,token);
  var api_url = 'https://openapi.naver.com/v1/nid/me';
  var header = "Bearer " + token; // Bearer 다음에 공백 추가
     var request = require('request');
     var options = {
         url: api_url,
         headers: {'Authorization': header}
      };
     request.get(options, function (error, response, bodys) {
       if (!error && response.statusCode == 200) {
         //로그인 & 회원가입
         var parsed = JSON.parse(bodys);
          console.log(parsed);
          image =parsed.response.profile_image;
          email =parsed.response.email;
         User.findOne({email: parsed.response.email}, function(err, user){
       		if(err) {
            return res.status(500).json({error: err});
          }
          //console.log(user);
       		if(user == null) {
            console.log('없으니까 회원가입');
            var newUser = new User();
            newUser.email = parsed.response.email;
            newUser.nickname = parsed.response.nickname;
            newUser.enc_id = parsed.response.enc_id;
            newUser.profile_image =parsed.response.profile_image;
            newUser.age =parsed.response.age;
            newUser.gender =parsed.response.gender;
            newUser.id =parsed.response.id;
            newUser.birthday =parsed.response.birthday;
            newUser.save(function(err){
              if(err){
                console.log(err);
                //return res.status(500).json({ error: 'database failure'});;
              }
              console.log("성공");
            });
          //  return res.status(200).json({error: 'not found'});
          }else{
              console.log('있으니 패스');
          }

       	})
       } else {
         console.log('error');
         if(response != null) {

           console.log('error = ' + response.statusCode);
         }
       }
       res.send(200,{image:image,email:email});
     });
});

module.exports = router;
