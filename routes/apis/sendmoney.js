var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Transaction = require('../models/transaction');
/* GET home page. */
router.post('/sendmoney', function(req, res, next) {
  User.find({ username: req.params.from_user }, function(error,docs){
    if(error)
      res.send(error);
    else{
      var money = docs[0].money - req.params.money;
      docs[0].set({money: money });
      docs[0].save(function (err, user) {
        if (err) return res.send(err);
      });
    }
  })
  User.find({ username: req.params.to_user }, function(error,docs){
    if(error)
      res.send(error);
    else{
      var money = docs[0].money + req.params.money;
      docs[0].set({money: money });
      docs[0].save(function (err, user) {
        if (err) return res.send(err);
      });
    }
  })
  var newtransaction = {
    from_user: req.params.from_user,
    to_user: req.params.to_user,
    money: req.params.money,
    date:req.params.date
  }
  Transaction.create(newtransaction,function(error, newtransaction){
    if(error)
      res.send(error)
    else{
      res.send("success");
    }
  })
});


});

module.exports = router;
