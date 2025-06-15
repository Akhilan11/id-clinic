const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name: { type: String, required: true }, 
    specialization: { type: String, required: true },
    email : { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, 'Please enter a valid email'] },
    phone: { type: String, required: true, match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'] }
});

module.exports = mongoose.model('Doctor', doctorSchema);