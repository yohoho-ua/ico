var config = {
  test: {
  'database': 'mongodb://localhost/avra-rest-server-test',
  'secret':'yohohosecret'
},
default: {
  'database': 'mongodb://localhost/avra-rest-server',
  'secret':'yohohosecret'
}

}

// module.exports = {
//   'secret':'yohohosecret',
//   'database': 'mongodb://localhost/avra-rest-server'
// };

exports.get = function get(env) {
return config[env] || config.default;
}
