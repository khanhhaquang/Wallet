var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Transaction = require('../models/transaction');
/* GET home page. */
router.get('/', function(req, res, next) {
  var transactions = {};
  Transaction.find({}, function(error,docs){
    if(error)
      res.send(error);
    else{
      res.json(docs);
    }

  })
});

module.exports = router;
