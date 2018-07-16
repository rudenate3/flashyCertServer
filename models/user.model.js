const bcrypt = require('bcryptjs'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    max: 32
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  history: {
    type: Object,
    required: true,
    default: {}
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date()
  }
})

const User = (module.exports = mongoose.model('users', UserSchema))

module.exports.createUser = (body, callback) => {
  const newUser = new User({
    username: body.username,
    email: body.email,
    password: body.password
  })

  bcrypt.genSalt(
    (10,
    (err, salt) => {
      if (err) return callback(err)
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return callback(err)
        newUser.password = hash
        newUser.save(callback)
      })
    })
  )
}

module.exports.authenticateUser = (body, callback) => {
  const { email, password } = body
  User.findOne({ email }).then(user => {
    if (!user) return callback({ error: 'User not found' })

    bcrypt.compare(password, user.password).then(match => {
      if (!match) return callback({ error: 'Incorrect password' })
      return callback(null, user)
    })
  })
}

module.exports.unique = (key, value, callback) => {
  const query = {}
  query[key] = value
  User.findOne(query).then(taken => {
    if (taken) return callback(false)
    return callback(true)
  })
}
