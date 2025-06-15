const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth'); // assuming your file is named auth.js

const {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  removeAppointment,
  getAppointmentById,
  getAppointmentsByDoctor,
  getRecentAppointmentsGroupedByDate
} = require('../controller/appointmentController');

// Create new appointment (protected)
router.post('/', createAppointment);

// Get all appointments (protected)
router.get('/', getAllAppointments);

// Get recent appointments (protected)
router.get('/recent', getRecentAppointmentsGroupedByDate);

// Get appointment by ID (protected)
router.get('/:id', getAppointmentById);

// Get appointments by doctor ID (protected)
router.get('/doctor/:doctorId', getAppointmentsByDoctor);

// Update appointment (protected)
router.put('/:id', updateAppointment);

// Delete appointment (protected)
router.delete('/:id', removeAppointment);

module.exports = router;
