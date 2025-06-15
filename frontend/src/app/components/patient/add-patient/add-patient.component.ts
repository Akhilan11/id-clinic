import { Component } from '@angular/core';
import { PatientService } from '../../../services/patient/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
  patient = {
    name: '',
    age: null,
    gender: '',
    phone: '',
    medicalHistory: ['']
  };

  constructor(
    private patientService: PatientService,
    private router: Router
  ) {}

  submitForm(): void {
    // console.log('Form submitted:', this.patient);
    this.patientService.addPatient(this.patient).subscribe({
      next: () => {
        alert('Patient added successfully!');
        this.router.navigate(['/patients']);
      },
      error: (err) => {
        console.error('Error adding patient:', err);
        alert('Error adding patient');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/patients']);
  }

  addMedicalHistoryEntry(): void {
    this.patient.medicalHistory.push('');
  }

  removeMedicalHistoryEntry(index: number): void {
    if (this.patient.medicalHistory.length > 1) {
      this.patient.medicalHistory.splice(index, 1);
    }
  }

  // This helps Angular optimize DOM rendering
  trackByIndex(index: number, item: string): number {
    return index;
  }

}
