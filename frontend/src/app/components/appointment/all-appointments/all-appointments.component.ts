import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment/appointment.service';

@Component({
  selector: 'app-all-appointments',
  templateUrl: './all-appointments.component.html',
  styleUrls: ['./all-appointments.component.css']
})
export class AllAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  paginatedAppointments: any[] = [];

  filterDate: string = '';
  selectedDoctor: string = 'All'; // dropdown selection for doctor
  doctorList: string[] = []; // unique doctor names for dropdown

  loading = false;
  error = '';

  editId: string | null = null;
  editStatus = '';

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.loading = true;
    this.appointmentService.getAllAppointments().subscribe({
      next: (res: any[]) => {
        this.appointments = res.sort(
          (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
        );
        this.filteredAppointments = [...res];

        // Get unique doctor names for dropdown
        const doctorNames = res
          .map(a => a.doctorId?.name)
          .filter(name => name); // filter out undefined/null
        this.doctorList = Array.from(new Set(doctorNames));

        this.updatePagination();
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.error?.error || 'Failed to load appointments';
        this.loading = false;
      }
    });
  }

  filterAppointments() {
    let result = [...this.appointments];

    // Filter by date
    if (this.filterDate) {
      result = result.filter(app => {
        const appDate = new Date(app.dateTime).toISOString().slice(0, 10);
        return appDate === this.filterDate;
      });
    }

    // Filter by doctor
    if (this.selectedDoctor !== 'All') {
      result = result.filter(app => app.doctorId?.name === this.selectedDoctor);
    }

    this.filteredAppointments = result;
    this.currentPage = 1;
    this.updatePagination();
  }

  clearFilter() {
    this.filterDate = '';
    this.selectedDoctor = 'All';
    this.filterAppointments();
  }

  startEdit(appointment: any) {
    this.editId = appointment._id;
    this.editStatus = appointment.status;
  }

  cancelEdit() {
    this.editId = null;
  }

  saveStatus(appointment: any) {
    const updatedData = { status: this.editStatus };
    this.appointmentService.updateAppointment(appointment._id, updatedData).subscribe({
      next: (updated: any) => {
        const idx = this.appointments.findIndex(a => a._id === updated._id);
        if (idx !== -1) {
          this.appointments[idx] = updated;
          this.filterAppointments();
        }
        this.editId = null;
      },
      error: (err: any) => alert('Failed to update status: ' + err.error?.error)
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredAppointments.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedAppointments = this.filteredAppointments.slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
}
