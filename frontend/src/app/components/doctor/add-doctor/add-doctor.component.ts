import { Component } from '@angular/core';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent {

  doctor = {
    name: '',
    specialization: '',
    phone: '',
    email : '',
  };

  error = '';
  success = '';

  constructor(private doctorService: DoctorService, private router: Router) {}

  addDoctor(): void {
    if (!this.doctor.name || !this.doctor.specialization || !this.doctor.phone) {
      this.error = 'All fields are required.';
      return;
    }

    this.doctorService.addDoctor(this.doctor).subscribe({
      next: () => {
        this.success = 'Doctor added successfully!';
        setTimeout(() => this.router.navigate(['/doctors']), 1000);
      },
      error: (err) => {
        console.error('Error adding doctor:', err);
        this.error = 'Error adding doctor.';
      }
    });
  }
}