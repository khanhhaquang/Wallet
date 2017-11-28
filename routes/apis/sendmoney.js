var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Transaction = require('../../models/transaction');
/* GET home page. */
router.post('', function(req, res, next) {
  // tìm và update người nhận
  User.findOne({ username: req.body.to_user }, function(error,touser){
    if(error)
      res.send(error);
    else{
      if(touser !== null){
        var money = parseFloat(touser.money) + parseFloat(req.body.money);
        console.log("new money of receiver "+ money);
        touser.set({money: money });
        touser.save(function (err, user) {
          if (err) return res.send(err);
        });
        // update người gửi
        User.findOne({ username: req.body.from_user }, function(error,fromuser){
          if(error)
            res.send(error);
          else{
            var money = fromuser.money - req.body.money;
            fromuser.set({money: money });
            fromuser.save(function (err, user) {
              if (err) return res.send(err);
            });
          }
        })
        // update lịch sử hệ thống
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
      }
      else{
        res.json("failed")
      }
    }
  })
});


module.exports = router;
