# 🩺 ID Clinic – Full Stack Clinic Management System

A complete Clinic Management System built for internal use at a private clinic. Designed to streamline appointments, manage doctors and patients, and generate prescriptions with real-time updates and automated notifications.

---

## 🚀 Features

### 👤 User Management
- Secure login for authenticated access
- Role-based routes (Doctor/Admin in future scope)
- JWT-based session management

### 🧑‍⚕️ Doctor & Patient Management
- Add, update, delete doctor and patient records
- View all registered profiles in one place

### 📅 Appointments
- Book, edit, cancel appointments
- Search appointments by doctor, patient, or date
- Prevent booking past time slots
- View all upcoming or past appointments
- Automatically send daily appointment reports via email

### 📋 Prescriptions
- Add new prescriptions linked to appointment and patient
- Edit/update prescription details
- Attach scanned documents or reports
- Export to PDF for download and printing

### 📧 Email Notifications
- Daily appointment summary emails to doctors (via SendGrid or similar)
- Plug-and-play utility (`dailyMailJobs.js`) for scheduled jobs

### 🔐 Authentication
- JWT-based auth with route protection middleware
- Token validation and user role enforcement

---

## 🧱 Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| **Frontend** | Angular 17, Bootstrap 5              |
| **Backend**  | Node.js, Express.js, Mongoose (MongoDB) |
| **Database** | MongoDB Atlas                        |
| **Authentication** | JWT                            |
| **Email**    | SendGrid (via `sendMail.js`)         |
| **Deployment** | Render (backend) + Cloudflare Pages (frontend) |

---

## 📂 Project Structure

### Backend (`/backend`)
```
backend/
├── controller/       # Handles business logic
├── model/            # MongoDB schemas (Mongoose)
├── routes/           # Express route handlers
├── middleware/       # Auth middleware (JWT)
├── utils/            # Email sender utility
├── config/           # DB connection config
├── assets/           # Static assets (e.g., logo)
├── server.js         # App entry point
├── dailyMailJobs.js  # Cron-like daily job
```

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── app/
│   │   ├── components/     # UI components
│   │   ├── services/       # API services
│   │   ├── guards/         # Auth route guards
│   │   └── models/         # Interfaces
├── angular.json
├── package.json
```

---

## 🛠️ Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
# Configure environment variables (PORT, MONGO_URI, JWT_SECRET)
node server.js
```

### 2. Frontend Setup
```bash
cd frontend
npm install
ng serve
```

### 3. Optional: Enable Daily Email Job
- Add `dailyMailJobs.js` to a CRON job or manually trigger it:
```bash
node dailyMailJobs.js
```

---

## 📌 Future Improvements

- Add role-based access (Admin, Doctor, Receptionist)
- Appointment reminders via WhatsApp/SMS
- Analytics dashboard
- Drag-and-drop calendar UI
- Dockerize app for easy deployment

---

## 📖 Use Case

Built for real-time use in a private clinic (for ophthalmology/general medicine), this system helps:
- Reduce manual workload
- Digitize prescriptions
- Send daily automated doctor updates
- Serve as a base for scalable clinic systems

---

## 👨‍💻 Author

**Akhilan A**  
[LinkedIn](https://www.linkedin.com/in/akhilan-a) | [Portfolio](https://akhilan-portfolio.pages.dev)

