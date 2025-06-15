const express = require('express');
const router = express.Router();

const { addPrescription,getAllPrescriptions,getPrescriptionById,deletePrescription,updatePrescription,getPrescriptionsByPatientId,getTotalPrescriptions,getRecentPrescriptionsGroupedByDate } = require('../controller/prescriptionController');

// Create new prescription
router.post('/', addPrescription);

// Get all prescriptions
router.get('/', getAllPrescriptions);

// Get total number of prescriptions
router.get('/count', getTotalPrescriptions);

// Get specific prescription by ID
router.get('/:id', getPrescriptionById);

// Get specific prescription by patient id
router.get('/patient/:patientId', getPrescriptionsByPatientId);

// Update a prescription
router.put('/:id', updatePrescription);

// Delete a prescription
router.delete('/:id', deletePrescription);


module.exports = router;
