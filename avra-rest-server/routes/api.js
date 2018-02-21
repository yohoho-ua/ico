var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var passport = require('passport');
var config = require('../config/database').get(process.env.NODE_ENV);
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var User = require("../models/user");
var Wallet = require("../models/wallet");

router.post('/signup', function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({
      success: false,
      msg: 'Please pass email and password.'
    });
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({
          success: false,
          msg: 'email already exists.'
        });
      }
      res.json({
        user_id: newUser._id,
        success: true,
        msg: 'Successful created new user.'
      });
    });
  }
});

router.post('/signin', function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({
        success: false,
        msg: 'Authentication failed. User not found.'
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var payload = {id: user._id, email: user.email, admin: user.admin};
          var token = jwt.sign(payload, config.secret);
          // return the information including token as JSON
          res.json({
            success: true,
            token: 'JWT ' + token
          });
        } else {
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
  });
});

//For tests, later it must be restricted for anyone except admin account
router.get('/user', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    User.find(function (err, users) {
      if (err) return next(err);
      res.json(users);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
});

// router.get('/user/:user_id', passport.authenticate('jwt', {
//   session: false
// }), function (req, res) {
//   var token = getToken(req.headers);
//   if (token) {
//     User.findOne({
//       user_id: req.params.user_id
//     }, function (err, wallets) {
//       if (err) return next(err);
//       res.json(wallets);
//     });
//   } else {
//     return res.status(403).send({
//       success: false,
//       msg: 'Unauthorized.'
//     });
//   }
// });

//All user wallets by ID
router.get('/wallet/:user_id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  if (!token) {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
  if (!req.params.user_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({
      success: false,
      msg: 'Invalid user ID'
    });
  }
  Wallet.find({
    user_id: req.params.user_id
  }, function (err, wallets) {
    if (err) throw err;
    res.json(wallets);
  });
});

//delete wallet
router.delete('/wallet/:wallet_id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  if (!token) {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
  if (!req.params.wallet_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({
      success: false,
      msg: 'Invalid wallet ID'
    });
  }
  Wallet.remove({ _id: req.params.wallet_id }, function (err, wallets) {
    if (err) {
      //something wrong with database
      return res.json({
        success: false,
        msg: 'Delete wallet failed.'
      });
    }
    res.json({
      success: true
    });
  });
});


//new wallet
router.get('/new_wallet/:user_id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  if (!token) {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
  if (!req.params.user_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send({
      success: false,
      msg: 'Invalid user ID'
    });
  }
  User.findOne({
    _id: req.params.user_id
  }, function (err, user) {
    console.log("in Database")
    if (err) {
      throw err;
    }
    if (!user) {
      return res.status(401).send({
        success: false,
        msg: 'Authentication failed. User not found.'
      });
    } else {
      var newWallet = createWallet(req.params.user_id);
      newWallet.save(function (err) {
        console.log("in New Wallet")
        if (err) {
          //something wrong with database
          return res.json({
            success: false,
            msg: 'Save wallet failed.'
          });
        }
        res.json({
          success: true,
          msg: 'Successful created new wallet.'
        });
      });
    }
  })
});


getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

createWallet = function (userId) {
  const publicLength = 128;
  const privateLength = 64;
  const addressLength = 40;

  var publicRand = "";
  var privateRand = "";
  var addressRand = "0x";
  var possible = "ABCDEFabcdef0123456789";

  //Generate 3 random string with length of target key, see const values
  for (var i = 0; i < publicLength; i++) {
    if (i < addressLength) {
      addressRand += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    if (i < privateLength) {
      privateRand += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    publicRand += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  var newWallet = new Wallet({
    address: addressRand,
    public: publicRand,
    private: privateRand,
    balance: 0,
    user_id: userId
  })

  // console.log(newWallet)
  return newWallet;
};

module.exports = router;