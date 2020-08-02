const checkValues = require('../middleware/checkValues');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user: {
    type: String,
    require: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 5,
    maxlength: 255,
    validate: {
      validator: (value) => {
        return checkValues.email(value);
      },
      message: 'Formato do email é inválido',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 5,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  let user = this;
  const hash = await bcrypt.hash(user.password, 10);
  this.password = hash;

  next();
});

module.exports = mongoose.model('User', UserSchema);
