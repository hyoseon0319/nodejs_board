// routes/home.js
var express = require('express');
var router = express.Router();

// express는 기본주소값 ./views로 지원
router.get('/', function(req, res){
  res.render('home/welcome');
});
router.get('/about', function(req, res){
  res.render('home/about');
});

module.exports = router;