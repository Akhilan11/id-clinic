import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllPatientsComponent } from './components/patient/all-patients/all-patients.component';
import { PatientDetailComponent } from './components/patient/patient-detail/patient-detail.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AllDoctorComponent } from './components/doctor/all-doctor/all-doctor.component';
import { DoctorDetailComponent } from './components/doctor/doctor-detail/doctor-detail.component';
import { AddDoctorComponent } from './components/doctor/add-doctor/add-doctor.component';
import { PrescriptionDetailComponent } from './components/prescription/prescription-detail/prescription-detail.component';
import { AddPrescriptionComponent } from './components/prescription/add-prescription/add-prescription.component';
import { AppointmentsComponent } from './components/appointment/add-appointment/appointments.component';
import { AllAppointmentsComponent } from './components/appointment/all-appointments/all-appointments.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgChartsModule } from 'ng2-charts';
import { LoginComponent } from './components/auth/login/login.component'; 
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AllPatientsComponent,
    PatientDetailComponent,
    AddPatientComponent,
    AllDoctorComponent,
    DoctorDetailComponent,
    AddDoctorComponent,
    PrescriptionDetailComponent,
    AddPrescriptionComponent,
    AppointmentsComponent,
    AllAppointmentsComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
