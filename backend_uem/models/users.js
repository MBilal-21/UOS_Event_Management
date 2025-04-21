const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    // required: false,
  },
  phoneNumber: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {                   // ← Add this field
    type: String,
    required: true,
  },
  currentSemester: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const User = mongoose.model('User', userSchema);
module.exports = User;
