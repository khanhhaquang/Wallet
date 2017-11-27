var express = require('express');
var router = express.Router();
const saltRounds = 10;
var bcrypt = require('bcrypt');
var User = require('../models/user');
/* GET home page. */
router.post('/', function(req, res, next) {
  bcrypt.hash(req.params.password, saltRounds, function(err, hashed_password) {
    // Store hash in your password DB.
    var newuser = {
      username: req.params.username,
      hashed_password: hashed_password,
      money: 1000,
    }
    User.create(newuser,function(error, user){
      if(error)
        res.send(error)
      else{
        res.send("success");
      }
    })
  });
});

module.exports = router;
