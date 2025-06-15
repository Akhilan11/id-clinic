import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';

// Patient components
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { AllPatientsComponent } from './components/patient/all-patients/all-patients.component';
import { PatientDetailComponent } from './components/patient/patient-detail/patient-detail.component';

// Doctor components
import { AddDoctorComponent } from './components/doctor/add-doctor/add-doctor.component';
import { AllDoctorComponent } from './components/doctor/all-doctor/all-doctor.component';
import { DoctorDetailComponent } from './components/doctor/doctor-detail/doctor-detail.component';

// Prescription components
import { PrescriptionDetailComponent } from './components/prescription/prescription-detail/prescription-detail.component';
import { AddPrescriptionComponent } from './components/prescription/add-prescription/add-prescription.component';

// Appointments components
import { AppointmentsComponent } from './components/appointment/add-appointment/appointments.component';
import { AllAppointmentsComponent } from './components/appointment/all-appointments/all-appointments.component';

// Auth
import { LoginComponent } from './components/auth/login/login.component';

// Unauthorized Page (you need to create this component)
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

// Guard
import { RoleGuard } from './auth/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // ✅ Accessible to everyone (no guard)
  { path: 'dashboard', component: DashboardComponent },

  // ✅ Authenticated users with doctor or receptionist roles
  { 
    path: 'appointments', 
    component: AllAppointmentsComponent, 
    canActivate: [RoleGuard], 
    data: { roles: ['doctor', 'receptionist'] } 
  },
  { 
    path: 'appointments/add', 
    component: AppointmentsComponent, 
    canActivate: [RoleGuard], 
    data: { roles: ['doctor', 'receptionist'] } 
  },

  // ✅ Doctors only
  { 
    path: 'patients', 
    component: AllPatientsComponent, 
    canActivate: [RoleGuard], 
    data: { roles: ['doctor'] } 
  },
  { 
    path: 'patients/add', 
    component: AddPatientComponent, 
    canActivate: [RoleGuard], 
    data: { roles: ['doctor'] } 
  },
  { 
    path: 'patients/:id', 
    component: PatientDetailComponent, 
    canActivate: [RoleGuard], 
    data: { roles: ['doctor'] } 
  },

  { 
    path: 'doctors', 
    component: AllDoctorComponent, 
    canActivate: [RoleGuard], 
    data: { roles: ['doctor'] } 
  },
  { 
    path: 'doctors/add', 
    component: AddDoctorComponent, 
    canActivate: [RoleGuard], 
    data: { roles: ['doctor'] } 
  },
  { 
    path: 'doctors/:id', 
    component: DoctorDetailComponent, 
    canActivate: [RoleGuard], 
    data: { roles: ['doctor'] } 
  },

  { 
    path: 'prescription/:id', 
    component: PrescriptionDetailComponent, 
    canActivate: [RoleGuard], 
    data: { roles: ['doctor'] } 
  },
  { 
    path: 'prescription/add/:id', 
    component: AddPrescriptionComponent, 
    canActivate: [RoleGuard], 
    data: { roles: ['doctor'] } 
  },

  // ✅ Login page
  { path: 'login', component: LoginComponent },

  // ✅ Unauthorized route
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
