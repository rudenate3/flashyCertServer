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
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser.save(callback)
      })
    })
  )
}
