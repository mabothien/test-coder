const mongoose = require('mongoose')

const matchesSchema = new mongoose.Schema({
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
  }
})

    
const Matches = mongoose.model( 'Matches', matchesSchema);
module.exports = Matches