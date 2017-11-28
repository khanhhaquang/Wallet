var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../../models/user');
var Transaction = require('../../models/transaction');
/* GET home page. */
router.get('', function(req, res, next) {
  console.log(req.query.username)
  User.findOne({ username: req.query.username}, function(error,doc){
    if(error)
      res.send(error);
    else{
      bcrypt.compare(req.query.password, doc.hashed_password).then(function(isright) {
          if(isright === true){
            res.json(doc)
          }
          else {
            res.json("failed")
          }
      });

    }

  })
});

module.exports = router;
