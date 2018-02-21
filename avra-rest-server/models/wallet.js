const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
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


