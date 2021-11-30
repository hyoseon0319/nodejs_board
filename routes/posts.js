// routes/posts.js
var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var controllers = require('../controllers/postController');

// Index
router.get('/', controllers.get);

// New
router.get('/new', function(req, res){
    res.render('posts/new');
  });

// create
router.post('/', controllers.write); 

// show & detail
router.get('/:id', controllers.detail);

// edit
router.get('/:id/edit', controllers.edit);  

// update
router.put('/:id', controllers.update);
  
// destroy
router.delete('/:id', controllers.delete);

module.exports = router;