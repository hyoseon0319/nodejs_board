// models/Post.js

var mongoose = require('mongoose');

// schema
var postSchema = mongoose.Schema({
    title: {type:String, required:true},
    body: {type:String},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date}
});


module.exports = mongoose.model('post', postSchema);