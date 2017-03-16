var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/itemDB');

var itemSchema = mongoose.Schema({
Item: String,
Link: String,
Image: String
});

var Item = mongoose.model('Item', itemSchema);

var commentSchema = mongoose.Schema({
_Item : {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
Name: String,
Text: String
});

var Comment = mongoose.model('Comment', commentSchema);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('Connected');
});

router.post('/item', function(req, res, next) {
  var newitem = new Item(req.body);
  newitem.save(function(err, post) {
    if (err) return console.error(err);
    res.sendStatus(200);
  });
});

router.get('/item', function(req, res, next) {
  Item.find(function(err,itemList) {
    if (err) return console.error(err);
    else {
      res.json(itemList);
    }
  })
});

router.delete('/item', function(req, res, next) {
  Item.remove({}, (err) => {
    if (err) return console.error(err);
    else {
      res.sendStatus(200);
    }
  });
});

router.post('/comment', function(req, res) {
  var newComment = new Comment(req.body);
  newComment.save(function(err, post) {
    if (err) return console.error(err);
    res.sendStatus(200);
  });
});

router.get('/comments/:id', function(req, res, next) {
  Comment.find({ _Item : req.params.id }, function(err,commentList) {
    if (err) return console.error(err);
    else {
      res.json(commentList);
    }
  })
});

module.exports = router;
