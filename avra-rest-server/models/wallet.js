var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WalletSchema = new Schema({
  public: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  private: {
    type: String,
    required: true
  },

  balance: {
    type: Number
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Wallet', WalletSchema);


