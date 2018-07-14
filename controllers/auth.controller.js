const jwt = require('jsonwebtoken')

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

exports.login = (req, res, next) => {
  User.validateUser(req.body, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      const payload = {
        id: user.id,
        username: user.username
      }

      jwt.sign(
        payload,
        process.env.jwtKey,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) res.send(err)
          res.json({
            success: true,
            token: `Bearer ${token}`
          })
        }
      )
    }
  })
}

exports.changePassword = (req, res, next) => {}

exports.logout = (req, res, next) => {}
