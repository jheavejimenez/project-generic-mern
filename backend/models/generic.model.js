const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const genericSchema = new Schema({
  genericName: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 3,
  },
}, {
  timestamps: true,
});

const Generic = mongoose.model('Generic', genericSchema);

module.exports = Generic;
