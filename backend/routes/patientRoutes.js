const express = require('express');
const router = express.Router();

const { addPatient,getAllPatients,getPatientById,updatePatient,deletePatient,searchPatientsByName,searchPatientsByPhone, getPatientCount,getPatientsByGender } = require('../controller/patientController');

// Create new patient
router.post('/', addPatient);

// Get all patients
router.get('/', getAllPatients);

// get patient count
router.get('/count', getPatientCount);

// get patients by gender
router.get('/gender', getPatientsByGender)

// Get a patient by ID
router.get('/:id', getPatientById);

// Update a patient
router.put('/:id', updatePatient);

// Delete a patient
router.delete('/:id', deletePatient);

// Search by name
router.get('/search/byname', searchPatientsByName);

// Search by phone
router.get('/search/byphone', searchPatientsByPhone);


module.exports = router;
