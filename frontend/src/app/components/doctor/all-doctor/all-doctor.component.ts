import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-doctor',
  templateUrl: './all-doctor.component.html',
  styleUrl: './all-doctor.component.css'
})

export class AllDoctorComponent implements OnInit {

  doctors: any[] = [];
  isLoading = false;
  error = '';

  editingDoctorId: string | null = null;
  editData: any = {
    name: '',
    specialization: '',
    phone: ''
  };

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.isLoading = true;
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error fetching doctors';
        this.isLoading = false;
      }
    });
  }

  deleteDoctor(id: string): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => this.fetchDoctors(),
        error: (err) => console.error('Error deleting doctor:', err)
      });
    }
  }

  startEdit(doctor: any): void {
    this.editingDoctorId = doctor._id;
    this.editData = { ...doctor };
  }

  cancelEdit(): void {
    this.editingDoctorId = null;
    this.editData = { name: '', specialization: '', phone: '' };
  }

  updateDoctor(id: string): void {
    this.doctorService.updateDoctor(id, this.editData).subscribe({
      next: () => {
        this.fetchDoctors();
        this.cancelEdit();
      },
      error: (err) => console.error('Error updating doctor:', err)
    });
  }

  goToDoctorDetail(id: string): void {
    this.router.navigate([`/doctors/${id}`]); 
  }
}