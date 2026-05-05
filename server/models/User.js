const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'], 
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password'], 
    minlength: 6
  },
  bio: {
    type: String,
    maxlength: 200,
    default: 'Welcome to my PlayerCard!'
  },
  currentVibe: {
    type: String,
    default: 'Chilling'
  },
  socialLinks: {
    discord: String,
    twitch: String,
    twitter: String
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
