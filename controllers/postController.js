var Post = require('../models/Post');

// Index
exports.get = function(req, res){
    Post.find({})
    .sort('-createdAt')
    .exec(function(err, posts){
        if(err) return res.json(err);
        res.render('posts/index', {posts:posts});
    });
  }


// 작성
exports.write = function(req, res){
    Post.create(req.body, function(err, post){
      if(err) return res.json(err);
      res.redirect('/posts');
    });
  }


// 상세정보
exports.detail = function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render('posts/show', {post:post});
    });
  }



// 편집
exports.edit = function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render('posts/edit', {post:post});
    });
  }


// 업데이트
exports.update = function(req, res){
    req.body.updatedAt = Date.now(); //2
    Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
      if(err) return res.json(err);
      res.redirect("/posts/"+req.params.id);
    });
  }


// 삭제
exports.delete = function(req, res){
    Post.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/posts');
    });
  }