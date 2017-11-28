var express = require('express');
var router = express.Router();
const saltRounds = 10;
var bcrypt = require('bcrypt');
var User = require('../../models/user');
var Transaction = require('../../models/transaction');
/* GET home page. */
router.post('', function(req, res, next) {
  User.findOne({ username: req.body.username}, function(error,doc){
    if(error){
      res.send(error);
    }
    else{
      if(doc === null){
      bcrypt.hash(req.body.password, saltRounds, function(err, hashed_password) {
        // Store hash in your password DB.
        console.log(hashed_password)
        var newuser = {
          username: req.body.username,
          hashed_password: hashed_password,
          money: 1000,
        }
        User.create(newuser,function(error, user){
          if(error)
            res.send(error)
          else{
            res.json(user);
          }
        })
      });
      }
      else res.json("exist");
    }
  })
});

module.exports = router;
