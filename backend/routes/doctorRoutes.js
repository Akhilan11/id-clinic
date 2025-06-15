const express = require('express');
const router = express.Router();

const { addDoctor,getAllDoctors,getDoctorById,updateDoctor,deleteDoctor, getDoctorCount } = require('../controller/doctorController');

// Create doctor
router.post('/', addDoctor);

// Read all doctors
router.get('/', getAllDoctors);

// get doctor count
router.get('/count', getDoctorCount);

// Read single doctor
router.get('/:id', getDoctorById);

// Update doctor
router.put('/:id', updateDoctor);

// Delete doctor
router.delete('/:id', deleteDoctor);

module.exports = router;
