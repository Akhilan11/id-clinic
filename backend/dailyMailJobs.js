require('dotenv').config();
const mongoose = require('mongoose');
const Doctor = require('./model/doctor');
const Appointment = require('./model/appointment');
const sendEmail = require('./utils/sendMail');

const timeZone = 'Asia/Kolkata'; // set your desired timezone here

// Convert a date to the given timezone by using locale string conversion
function getZonedTime(date, tz) {
  return new Date(date.toLocaleString('en-US', { timeZone: tz }));
}

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const now = new Date();

    // Get now in the target timezone
    const zonedNow = getZonedTime(now, timeZone);

    // Calculate start and end of day in that timezone
    const startOfDay = new Date(zonedNow);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(zonedNow);
    endOfDay.setHours(23, 59, 59, 999);

    // For MongoDB queries, convert back to UTC dates
    // by getting the equivalent UTC time for these local times
    const utcStartOfDay = new Date(startOfDay.toISOString());
    const utcEndOfDay = new Date(endOfDay.toISOString());

    const doctors = await Doctor.find();

    for (const doctor of doctors) {
      const appointments = await Appointment.find({
        doctorId: doctor._id,
        dateTime: { $gte: utcStartOfDay, $lte: utcEndOfDay },
      });

      if (appointments.length === 0) {
        console.log(`No appointments for Dr. ${doctor.name} today.`);
        continue;
      }

      console.log(`Sending email to ${doctor.email}`);

      // Generate appointments HTML blocks (cards)
      const appointmentsHtml = appointments
        .map(
          (a) => `
            <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 12px; padding: 12px 15px; font-family: Arial, sans-serif; color: #333;">
              <div style="font-weight: 600; color: #2980b9; font-size: 16px;">${a.patientName}</div>
              <div style="color: #7f8c8d; font-size: 14px; margin-top: 3px;">
                ${new Date(a.dateTime).toLocaleString('en-IN', {
                  timeZone,
                  hour12: true,
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <div style="font-style: italic; color: #27ae60; margin-top: 5px;">${a.reason}</div>
              <div style="font-weight: 600; color: ${
                a.status.toLowerCase() === 'confirmed' ? '#27ae60' : '#e67e22'
              }; margin-top: 5px;">(${a.status})</div>
            </div>`
        )
        .join('');

      const html = `
        <div style="max-width: 600px; margin: auto; background-color: #fafafa; border: 1px solid #ddd; border-radius: 8px; padding: 0; font-family: Arial, sans-serif; color: #333;">
  
        <!-- Header bar (navbar style) -->
        <div style="display: flex; align-items: center; padding: 15px 20px; background-color: transparent; border-bottom: 1px solid #ddd;">
          <img src="https://i.imgur.com/3ZQ3w5m.png" alt="Logo" width="50" height="50" style="margin-right: 15px;" />
          <span style="font-size: 20px; font-weight: 600; color: #2c3e50;">iD Medical Consultation Center</span>
        </div>

        <div style="padding: 20px;">
          <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; margin-bottom: 20px;">
            Hello Dr. ${doctor.name},
          </h3>
          <p style="font-size: 16px; margin-bottom: 20px;">Here are your appointments for today:</p>

          ${appointmentsHtml}

          <footer style="text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #555; background-color: #e9ecef; border-radius: 0 0 8px 8px;">
            © 2025 iD Medical Consultation Center. All rights reserved.
          </footer>
        </div>
      </div>
      `;

      try {
        await sendEmail(doctor.email, "Today's Appointments Summary", html);
        console.log(`Email sent to Dr. ${doctor.name} successfully.`);
      } catch (error) {
        console.error(`Error sending email to Dr. ${doctor.name}:`, error);
      }
    }
  } catch (error) {
    console.error('Error in script:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

start();
