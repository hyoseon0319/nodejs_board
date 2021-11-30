var express = require('express');
var router = express.Router();
var User = require('../models/User');
var controllers = require('../controllers/userController');

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

// functions
function parseError(errors){
  var parsed = {};
  if(errors.name == 'ValidationError'){
    for(var name in errors.errors){
      var validationError = errors.errors[name];
      parsed[name] = { message:validationError.message };
    }
  }
  else if(errors.code == '11000' && errors.errmsg.indexOf('username') > 0) {
    parsed.username = { message:'This username already exists!' };
  }
  else {
    parsed.unhandled = JSON.stringify(errors);
  }
  return parsed;
}