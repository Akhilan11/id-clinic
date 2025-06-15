import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointment/appointment.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent implements OnInit {
  doctor: any;
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  selectedAppointment: any = null;
  isLoading = false;
  error = '';
  filterDate: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchDoctor(id);
      this.fetchAppointments(id);
    }
  }

  fetchDoctor(id: string): void {
    this.isLoading = true;
    this.doctorService.getDoctorById(id).subscribe({
      next: (data) => {
        this.doctor = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error fetching doctor details';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  fetchAppointments(doctorId: string): void {
    this.appointmentService.getAppointmentsByDoctorId(doctorId).subscribe({
      next: (data: any) => {
        this.appointments = data;
        this.applyDateFilter();  // Apply filter initially
      },
      error: (err: any) => {
      // Only show error if it's a real server error
      if (err.status !== 404) {
        this.error = 'Error fetching appointments';
        console.error(err);
      } else {
        // Treat 404 as "no appointments" if your backend returns 404 for empty results — otherwise, remove this block entirely
        this.appointments = [];
      } 
    }
    });
  }

  applyDateFilter(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset to midnight

    this.filteredAppointments = this.appointments.filter((appt) => {
      const apptDate = new Date(appt.dateTime);
      apptDate.setHours(0, 0, 0, 0);

      // Filter out past dates
      if (apptDate < today) return false;

      // If a filter date is selected, filter by that exact date
      if (this.filterDate) {
        const filter = new Date(this.filterDate);
        filter.setHours(0, 0, 0, 0);
        return apptDate.getTime() === filter.getTime();
      }

      return true; // no filter, show today & future appointments
    });
  }

  clearDateFilter(): void {
    this.filterDate = null;
    this.applyDateFilter();
  }

  editAppointmentStatus(appt: any): void {
    // Clone appointment status and _id for editing
    this.selectedAppointment = { _id: appt._id, status: appt.status };
  }

  cancelEdit(): void {
    this.selectedAppointment = null;
  }

  updateAppointmentStatus(): void {
    if (!this.selectedAppointment) return;

    this.appointmentService.updateAppointment(this.selectedAppointment._id, {
      status: this.selectedAppointment.status
    }).subscribe({
      next: () => {
        // Refresh appointments after update
        if (this.doctor?._id) {
          this.fetchAppointments(this.doctor._id);
        }
        this.selectedAppointment = null;
      },
      error: (err: any) => {
        if (err.status !== 404) {
          this.error = 'Error updating appointment status';
          console.error(err);
        } else {
          this.filteredAppointments = [];
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/doctors']);
  }
}
