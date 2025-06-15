const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please fill a valid phone number'],
    unique: true
  },
  medicalHistory: {
    type: [String],
    default: []
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);
