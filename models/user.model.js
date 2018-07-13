const mongoose = require('mongoose'),
  Schema = mongoose.require.Schema

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

module.exports = User = mongoose.model('users', UserSchema)
