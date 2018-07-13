const User = require('../models/user.model')

exports.register = (req, res, next) => {
  // TODO validate req.body
  User.createUser(req.body, err => {
    if (err) {
      res.send(err)
    } else {
      res.json({
        success: true,
        message: 'User Created'
      })
    }
  })
}

exports.login = (req, res, next) => {}

exports.changePassword = (req, res, next) => {}

exports.logout = (req, res, next) => {}
