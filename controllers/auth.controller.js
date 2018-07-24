const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

exports.register = (req, res) => {
  // TODO validate req.body
  User.unique('email', req.body.email)
    .then(unique => {
      if (!unique) return res.json({ error: 'Email Taken' })
      User.unique('username', req.body.username)
        .then(unique => {
          if (!unique) return res.json({ error: 'Username Taken' })
          User.createUser(req.body)
            .then(() => res.sendStatus(201))
            .catch(err => res.send(err))
        })
        .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
}

exports.login = (req, res) => {
  User.authenticateUser(req.body)
    .then(user => {
      if (!user) return res.sendStatus(404)
      const payload = {
        id: user.id,
        username: user.username
      }
      jwt.sign(
        payload,
        process.env.jwtKey,
        { expiresIn: 7200 },
        (err, token) => {
          if (err) res.send(err)
          res.json({
            success: true,
            token: `Bearer ${token}`
          })
        }
      )
    })
    .catch(err => res.send(err))
}

exports.changePassword = (req, res, next) => {}

exports.logout = (req, res, next) => {}
