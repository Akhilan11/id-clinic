const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  dateTime: { type: Date, required: true },  // <-- Fixed typo: `date time` → `dateTime`
  reason: { type: String, trim: true },
  status: { 
    type: String, 
    enum: ['Confirmed', 'Cancelled', 'Pending'],  // Added 'Pending' since it's the default
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
