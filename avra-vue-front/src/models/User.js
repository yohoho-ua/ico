/* eslint-disable  camelcase */
// import jwt from 'jsonwebtoken'
import JwtDecode from 'jwt-decode'

export default class User {
  static getFrom (token) {
    try {
      // verify and decode token witn secretkey, if fails or any other error - return null
      const obj = JwtDecode(token)
      // var decoded = jwt.verify(token, 'yohohosecret')
      console.log('from user, token = ' + token)
      console.log('from user, decoded = ' + JSON.stringify(obj))
      return new User(obj)
      // return new User(decoded)
    } catch (_) {
      return null
    }
  }

  constructor (userCredentials) {
    this.id = userCredentials.id
    this.email = userCredentials.email
    this.admin = userCredentials.admin
  }

  //   get isAdmin () {
  //     return this.admin
  //   }
}
