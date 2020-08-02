const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const checkValues = require('../middleware/checkValues');

const NoteTakingSchema = new Schema({
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  title: {
    type: String,
    require: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
  tag: {
    type: String,
    required: true,
    trim: true,
    enum: checkValues.tag,
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false,
  },
  text: {
    type: String,
    require: true,
    minlength: 1,
  },
  lastUpdate: {
    type: String,
    require: true,
    minlength: 14,
    maxlength: 19,
  },
});

module.exports = mongoose.model('NoteTaking', NoteTakingSchema);
