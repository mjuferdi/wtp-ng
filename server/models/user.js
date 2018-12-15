const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Database schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    max: [50, 'Too long, max is 50 characters']
  },
  email: {
    type: String,
    required: true,
    min: [4, 'Too short, min is 4 characters']
  },
  password: {
    type: String,
    required: true,
    min: [4, 'Too short, min is 4 characters']
  }

});

module.exports = mongoose.model('User', userSchema);
