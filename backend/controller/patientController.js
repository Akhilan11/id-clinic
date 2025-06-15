const { Console } = require('console');
const Patient = require('../model/patient');

// Add a new patient
const addPatient = async (req, res) => {
    const { name, age, gender, phone, medicalHistory } = req.body;

    if (!name || !age || !gender || !phone) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const newPatient = await Patient.create({ name, age, gender, phone, medicalHistory });
        res.status(201).json({ message: "Patient created successfully", patient: newPatient });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating patient", error: err });
    }
};

// Get all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ message: "Error fetching patients", error: err });
    }
};

// Get patient by ID
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ message: "Error fetching patient", error: err });
    }
};

// Update patient by ID
const updatePatient = async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json({ message: "Patient updated", patient: updatedPatient });
    } catch (err) {
        res.status(500).json({ message: "Error updating patient", error: err });
    }
};

// Delete patient by ID
const deletePatient = async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting patient", error: err });
    }
};

// Search patients by name (case-insensitive partial match)
const searchPatientsByName = async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: "Name query parameter is required" });
    }

    try {
        const patients = await Patient.find({
            name: { $regex: name, $options: 'i' }
        });

        if (patients.length === 0) {
            return res.status(404).json({ message: "No patients found with this name" });
        }

        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ message: "Error searching patients", error: err });
    }
};

// Search patients by phone (case-insensitive partial match)
const searchPatientsByPhone = async (req, res) => {
    const { phone } = req.query;
    if (!phone) {
        return res.status(400).json({ message: "Phone query parameter is required" });
    }

    try {
        const patients = await Patient.find({
            phone: { $regex: phone, $options: 'i' }
        });

        if (patients.length === 0) {
            return res.status(404).json({ message: "No patients found with this phone number" });
        }

        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ message: "Error searching patients by phone", error: err });
    }
};

const getPatientCount = async (req, res) => {
    try {
        const count = await Patient.estimatedDocumentCount();
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ message: "Error fetching patient count", error: err });
    }
};

const getPatientsByGender = async (req, res) => {
  try {
    // Aggregate to count patients grouped by gender
    const genderCounts = await Patient.aggregate([
      {
        $group: {
          _id: "$gender",       // assuming gender field stores 'male' or 'female'
          count: { $sum: 1 }
        }
      }
    ]);

    // Format response to always have both genders, even if 0
    const response = {
      male: 0,
      female: 0,
    };

    genderCounts.forEach(item => {
        const gender = item._id.toLowerCase();
        if (gender === 'male') response.male = item.count;
        else if (gender === 'female') response.female = item.count;
    });
    res.json(response);

  } catch (err) {
    console.error('Error fetching patients by gender:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
    addPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    searchPatientsByName,
    searchPatientsByPhone,
    getPatientCount,
    getPatientsByGender
};
