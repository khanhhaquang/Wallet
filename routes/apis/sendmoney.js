var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Transaction = require('../../models/transaction');
/* GET home page. */
router.post('', function(req, res, next) {
  User.findOne({ username: req.body.from_user }, function(error,doc){
    if(error)
      res.send(error);
    else{
      var money = doc.money - req.body.money;
      doc.set({money: money });
      doc.save(function (err, user) {
        if (err) return res.send(err);
      });
    }
  })
  User.findOne({ username: req.body.to_user }, function(error,doc){
    if(error)
      res.send(error);
    else{
      var money = parseFloat(doc.money) + parseFloat(req.body.money);
      console.log("new money of receiver "+ money);
      doc.set({money: money });
      doc.save(function (err, user) {
        if (err) return res.send(err);
      });
    }
  })
  var newtransaction = {
    from_user: req.body.from_user,
    to_user: req.body.to_user,
    money: req.body.money,
    date:req.body.date
  }
  Transaction.create(newtransaction,function(error, newtransaction){
    if(error)
      res.send(error)
    else{
      res.json(newtransaction);
    }
  })
});


module.exports = router;
