var Post = require('../models/Post');
var util = require('../util');

// Index
exports.get = async function(req, res){
  var page = Math.max(1, parseInt(req.query.page));
  var limit = Math.max(1, parseInt(req.query.limit));
  page = !isNaN(page)?page:1;
  limit = !isNaN(limit)?limit:10;

  var skip = (page-1)*limit;
  var count = await Post.countDocuments({});
  var maxPage = Math.ceil(count/limit);
  var posts = await Post.find({})
    .populate('author')
    .sort('-createdAt')
    .skip(skip)
    .limit(limit)
    .exec()
      res.render('posts/index', {
        posts:posts,
        currentPage:page,
        maxPage:maxPage,
        limit:limit
    });
  }


// 작성
exports.write = function(req, res){
    req.body.author = req.user._id;
    Post.create(req.body, function(err, post){
      if(err) {
      req.flash('post', req.body);
      req.flash('errors', util.parseError(err));
      return res.redirect('/posts/new'+res.locals.getPostQueryString());
    }
      res.redirect('/posts'+res.locals.getPostQueryString(false, {page:1}));
    });
  }


// 상세정보
exports.detail = function(req, res){
    Post.findOne({_id:req.params.id})
    .populate('author')
    .exec(function(err, post){
      if(err) return res.json(err);
      res.render('posts/show', {post:post})
    });
}

// 편집
exports.edit = function(req, res){
  var post = req.flash('post')[0];
  var errors = req.flash('errors')[0] || {};
  if(!post){
    Post.findOne({_id:req.params.id}, function(err, post){
        if(err) return res.json(err);
        res.render('posts/edit', { post:post, errors:errors });
      });
  }
  else {
    post._id = req.params.id;
    res.render('posts/edit', { post:post, errors:errors });
  }
}


// 업데이트
exports.update = function(req, res){
    req.body.updatedAt = Date.now(); //2
    Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
      if(err) {
        req.flash('post', req.body);
        req.flash('errors', util.parseError(err));
        return res.redirect('/posts/'+req.params.id+'/edit'+res.locals.getPostQueryString());
      }
        res.redirect("/posts/"+req.params.id+res.locals.getPostQueryString());
    });
  }


// 삭제
exports.delete = function(req, res){
    Post.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/posts'+res.locals.getPostQueryString());
    });
  }