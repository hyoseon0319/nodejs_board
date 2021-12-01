var User = require('../models/User');
var util = require('../util');

// Index
exports.get = function(req, res){
    User.find({})
      .sort({username:1})
      .exec(function(err, users){
        if(err) return res.json(err);
        res.render('users/index', {users:users});
      });
  }


// create
exports.create = function(req, res){
    User.create(req.body, function(err, user){
      if(err){
        req.flash('user', req.body);
        req.flash('errors', util.parseError(err));
        return res.redirect('/users/new');
      }
      res.redirect('/users');
    });
  }


// detail
exports.detail = function(req, res){
    User.findOne({username:req.params.username}, function(err, user){
      if(err) return res.json(err);
      res.render('users/show', {user:user});
    });
  }


// edit
exports.edit = function(req, res){
    var user = req.flash('user')[0];
    var errors = req.flash('errors')[0] || {};
    if(!user){
      User.findOne({username:req.params.username}, function(err, user){
        if(err) return res.json(err);
        res.render('users/edit', { username:req.params.username, user:user, errors:errors });
      });
    }
    else {
      res.render('users/edit', { username:req.params.username, user:user, errors:errors });
    }
  }


// update
exports.update = function(req, res, next){
    User.findOne({username:req.params.username})
      .select('password')
      .exec(function(err, user){
        if(err) return res.json(err);
  
        // update user object
        user.originalPassword = user.password;
        user.password = req.body.newPassword? req.body.newPassword : user.password;
        for(var p in req.body){
          user[p] = req.body[p];
        }
  
        // save updated user
        user.save(function(err, user){
          if(err){
            req.flash('user', req.body);
            req.flash('errors', util.parseError(err));
            return res.redirect('/users/'+req.params.username+'/edit');
          }
          res.redirect('/users/'+user.username);
        });
    });
  }


// delete
exports.delete = function(req, res){
    User.deleteOne({username:req.params.username}, function(err){
      if(err) return res.json(err);
      res.redirect('/users');
    });
  }

