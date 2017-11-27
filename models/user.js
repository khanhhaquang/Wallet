var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{
      type: String,
      required: true,
    },
    hashed_password:{
      type: String,
      required: true,
    },
    money:{
      type: Number,
    }
});

module.exports = mongoose.model('Users', UserSchema);
