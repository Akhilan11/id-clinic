const Appointment = require('../model/appointment');

// Create new appointment
const createAppointment = async (req, res) => {
  try {
    const { patientName, doctorId, dateTime, reason, status } = req.body;

    if (!patientName || !doctorId || !dateTime) {
      return res.status(400).json({ error: 'patientName, doctorId, and dateTime are required.' });
    }

    const appointment = new Appointment({ patientName, doctorId, dateTime, reason, status });
    await appointment.save();

    // Only populate if doctorId is a reference
    const populated = await appointment.populate('doctorId');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('doctorId');

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update appointment
const updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('doctorId');


    if (!updated) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete appointment
const removeAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointments by doctor ID
const getAppointmentsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const appointments = await Appointment.find({ doctorId }).populate('doctorId');

    if (appointments.length === 0) {
      return res.status(404).json({ error: 'No appointments found for this doctor' });
    }

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRecentAppointmentsGroupedByDate = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setHours(0, 0, 0, 0); // reset time to start of the day
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // last 7 days including today

    const data = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recent appointments grouped by date', error });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  removeAppointment,
  getAppointmentById,
  getAppointmentsByDoctor,
  getRecentAppointmentsGroupedByDate
};
