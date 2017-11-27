var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user')
/* GET home page. */
router.get('/', function(req, res, next) {
  var message = "";
  var hashed_password = req.params.password;
  User.find({ username: req.params.username}, function(error,docs){
    if(error)
      res.send(error);
    else{
      bcrypt.compare(req.params.password, docs[0].hashed_password).then(function(res) {
          if(res == true){
            res.json(docs);
          }
          else {
            res.send("not found");
          }
      });

    }

  })
});

module.exports = router;
