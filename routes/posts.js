// routes/posts.js
var express = require('express');
var router = express.Router();
var controllers = require('../controllers/postController');
var util = require('../util');
var Post = require('../models/Post');

// Index
router.get('/', util.isLoggedin, controllers.get);

// New
router.get('/new', util.isLoggedin, function(req, res){
  var post = req.flash('post')[0] || {};
  var errors = req.flash('errors')[0] || {};
  res.render('posts/new', { post:post, errors:errors });
})

// create
router.post('/', util.isLoggedin, controllers.write); 

// show & detail
router.get('/:id', checkPermission, util.isLoggedin, controllers.detail);

// edit
router.get('/:id/edit', checkPermission, util.isLoggedin, controllers.edit);  

// update
router.put('/:id', checkPermission, util.isLoggedin, controllers.update);
  
// destroy
router.delete('/:id', checkPermission, util.isLoggedin, controllers.delete);

module.exports = router;

function checkPermission(req, res, next){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    if(post.author != req.user.id) return util.noPermission(req, res);
    next();
  });
}