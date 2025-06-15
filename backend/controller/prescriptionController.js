const Prescription = require('../model/prescription');

// Create prescription
const addPrescription = async (req, res) => {
    const { patient,doctor,right_eye,left_eye,vision_right,vision_left,diagnosis,iop_right,iop_left,medications,instructions } = req.body;

    if (!patient || !doctor ) {
        return res.status(400).json({ message: "Patient, doctor fields are required" });
    }

    try {
        const newPrescription = await Prescription.create({ patient,doctor,right_eye,left_eye,vision_right,vision_left,diagnosis,iop_right,iop_left,medications,instructions });

        res.status(201).json({ message: "Prescription added successfully", prescription: newPrescription });
    } catch (err) {
        res.status(500).json({ message: "Error creating prescription", error: err });
    }
};

// Get all prescriptions
const getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find()
            .populate('patient', 'name age gender phone')
            .populate('doctor', 'name specialization phone');

        res.status(200).json(prescriptions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching prescriptions", error: err });
    }
};

// Get prescription by ID
const getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id)
            .populate('patient', 'name age gender phone')
            .populate('doctor', 'name specialization phone');

        if (!prescription) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        res.status(200).json(prescription);
    } catch (err) {
        res.status(500).json({ message: "Error fetching prescription", error: err });
    }
};

// Delete prescription
const deletePrescription = async (req, res) => {
    try {
        const deleted = await Prescription.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        res.status(200).json({ message: "Prescription deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting prescription", error: err });
    }
};

// Update prescription by ID
const updatePrescription = async (req, res) => {
    try {
        const updatedPrescription = await Prescription.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        .populate('patient', 'name age gender phone')
        .populate('doctor', 'name specialization phone');

        if (!updatedPrescription) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        res.status(200).json({ message: "Prescription updated successfully", prescription: updatedPrescription });
    } catch (err) {
        res.status(500).json({ message: "Error updating prescription", error: err });
    }
};

// Get prescriptions by patient ID
const getPrescriptionsByPatientId = async (req, res) => {
    const { patientId } = req.params;

    try {
        const prescriptions = await Prescription.find({ patient: patientId })
            .populate('patient', 'name age gender phone')
            .populate('doctor', 'name specialization phone');

        if (!prescriptions || prescriptions.length === 0) {
            return res.status(404).json({ message: "No prescriptions found for this patient" });
        }

        res.status(200).json(prescriptions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching prescriptions by patient", error: err });
    }
};

// Total prescription prescriped by doctor
const getPrescriptionCountByDoctor = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const count = await Prescription.countDocuments({ doctor: doctorId });

        if (count === 0) {
            return res.status(404).json({ message: "No prescriptions found for this doctor" });
        }

        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ message: "Error fetching prescription count", error: err });
    }
};

// total prescription 
const getTotalPrescriptions = async (req, res) => {
    try {
        const total = await Prescription.estimatedDocumentCount();
        res.status(200).json({ total });
    } catch (err) {
        res.status(500).json({ message: "Error fetching total prescriptions", error: err });
    }
};

module.exports = {
    addPrescription,
    getAllPrescriptions,
    getPrescriptionById,
    deletePrescription,
    updatePrescription,
    getPrescriptionsByPatientId,
    getTotalPrescriptions
};
