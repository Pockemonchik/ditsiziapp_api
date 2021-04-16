const mongoose = require('mongoose');

const ToyCarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  color: {
      type: String,
      required: false
  },
  year: {
      type: Date
  }
});


const ToyCar = mongoose.model('ToyCar', ToyCarSchema);

module.exports = ToyCar;