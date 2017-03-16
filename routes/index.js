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

module.exports = router;
