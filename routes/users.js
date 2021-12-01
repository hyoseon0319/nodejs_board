var express = require('express');
var router = express.Router();
var controllers = require('../controllers/userController');
var util = require('../util');
var User = require('../models/User');

// Index
router.get('/', controllers.get);

// New
router.get('/new', function(req, res){
  var user = req.flash('user')[0] || {};
  var errors = req.flash('errors')[0] || {};
  res.render('users/new', { user:user, errors:errors });
});

// create
router.post('/', controllers.create);

// detail
router.get('/:username', controllers.detail);

// edit
router.get('/:username/edit', controllers.edit);

// update
router.put('/:username', controllers.update);

// delete
router.delete('/:username', controllers.delete);


module.exports = router;


function checkPermission(req, res, next) {
  User.findOne({username: req.params.username}, function (err, user) {
    if(err) return res.json(err);
    if(user.id != req.user.id) return util.noPermission(req, res);

    next();
  });
}