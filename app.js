var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var index = require('./routes/index');
var shops = require('./routes/shops'); // 상점 로직
var books = require('./routes/books'); // 예약 로직
var users = require('./routes/users'); // 네이버 로그인
var reserv = require('./routes/reserv');
var map = require('./routes/map');
var crawl = require('./routes/crawl');
var Store = require('./models/stores');
var client_id = '3lidda3OUe2AapX8rUMC';
var client_secret = 'ELdoU2m3wu';
var app = express();

mongoose.connect('mongodb://localhost/unithon_final2');
var db = mongoose.connection;

autoIncrement.initialize(db);

db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to open server");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/shops', shops);
app.use('/books', books);
app.use('/users', users);
app.use('/map',map);
app.use('/reserv',reserv);
app.use('/crawl',crawl);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

function test()
{
  Store.findOne({x:11111},function(err, shops){
    if(err) {
      return res.status(500).json({error: err});
    }else{
    //  var array = [];
}
if(shops == undefined){
  //console.log("예외처리 되었다.");
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
   setTimeout(test, 1000);
}

test();
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
