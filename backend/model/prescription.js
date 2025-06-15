const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    name: { type: String },
    dosage: { type: String },
    frequency: { type: String },
    duration: { type: String }
}, { _id: false });

const eyePrescriptionSchema = new mongoose.Schema({
    sphere: { type: Number },     // e.g., -2.00
    cylinder: { type: Number },                    // e.g., -1.25
    axis: { type: Number, min: 0, max: 180 }       // 0-180 degrees
}, { _id: false });

const prescriptionSchema = mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date_prescribed: { type: Date, default: Date.now },

    // Ophthalmic Prescription
    right_eye: { type: eyePrescriptionSchema },
    left_eye: { type: eyePrescriptionSchema },

    // Optional notes
    vision_right: { type: String }, // e.g., "6/6"
    vision_left: { type: String },
    diagnosis: { type: String }, // General diagnosis (e.g., Myopia)
    iop_right: { type: String }, // Intraocular pressure (optional)
    iop_left: { type: String },
    
    //Other medications 
    medications: [medicationSchema],
    instructions: { type: String }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
