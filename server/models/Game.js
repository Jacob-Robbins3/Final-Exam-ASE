const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  title: {
    type: String,
    required: [true, 'Game title is required'] 
  },
  platform: {
    type: String,
    enum: ['PC', 'Nintendo Switch', 'PlayStation', 'Xbox', 'Mobile'],
    required: true
  },
  rank: {
    type: String,
    default: 'Unranked'
  },
  peakPerformance: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Game', GameSchema);
