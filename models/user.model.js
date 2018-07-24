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
    type: Object
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

module.exports.createUser = body => {
  const newUser = new User({
    username: body.username,
    email: body.email,
    password: body.password
  })

  return bcrypt
    .genSalt(10)
    .then(salt => {
      bcrypt
        .hash(newUser.password, salt)
        .then(hash => {
          newUser.password = hash
          return newUser.save()
        })
        .catch(Promise.resolve(null))
    })
    .catch(Promise.resolve(null))
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

module.exports.unique = (key, value) => {
  const query = {}
  query[key] = value
  return User.findOne(query).then(result => {
    if (result) return false
    return true
  })
}
