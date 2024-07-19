const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  tags: [String],
  backgroundColor: { type: String, default: '#ffffff' },
  archived: { type: Boolean, default: false },
  deletedAt: { type: Date },
});

module.exports = mongoose.model('Note', noteSchema);
