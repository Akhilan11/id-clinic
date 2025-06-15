const Doctor = require('../model/doctor');

// Add a new doctor
const addDoctor = async (req, res) => {
    const { name, specialization, phone, email } = req.body;
    if (!name || !specialization || !phone || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newDoctor = await Doctor.create({ name, specialization, phone, email });
        res.status(201).json({ message: "Doctor created successfully", doctor: newDoctor });
    } catch (err) {
        res.status(500).json({ message: "Error creating doctor", error: err });
    }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json({ message: "Error fetching doctors", error: err });
    }
};

// Get doctor by ID
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json(doctor);
    } catch (err) {
        res.status(500).json({ message: "Error fetching doctor", error: err });
    }
};

// Update doctor
const updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json(updatedDoctor);
    } catch (err) {
        res.status(500).json({ message: "Error updating doctor", error: err });
    }
};

// Delete doctor
const deleteDoctor = async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting doctor", error: err });
    }
};

// Get doctor count
const getDoctorCount = async (req, res) => {
    try {
        const count = await Doctor.estimatedDocumentCount();
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ message: "Error fetching doctor count", error: err });
    }
};

module.exports = { addDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor, getDoctorCount };
