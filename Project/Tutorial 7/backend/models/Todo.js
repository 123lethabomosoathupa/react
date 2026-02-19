const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  body:      { type: String, required: true },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', todoSchema);