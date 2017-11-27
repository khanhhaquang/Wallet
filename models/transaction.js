var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    from_user:{
      type: String,
      required: true,
    },
    to_user:{
      type: String,
      required: true,
    },
    money:{
      type: Number,
      required: true,
    }
    date:{
      type: Date,
    }
});

module.exports = mongoose.model('Transactions', TransactionSchema);
