const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  picture: {
    type: String,
    required: false
  },
  isMatch: {
    type: Boolean,
    required: false
  },
  isPass: {
    type: Boolean,
    required: false
  }
})

const Users = mongoose.model('Users', userSchema)
module.exports = Users
