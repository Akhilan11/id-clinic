import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient/patient.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {

  patients: any[] = [];
  isLoading: boolean = false;
  error: string = '';

  editingPatientId: string | null = null;
  editData: any = {
    name: '',
    age: '',
    gender: '',
    phone: ''
  };

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.isLoading = true;
    this.patientService.getAllPatients().subscribe({
      next: (data: any[]) => {
        this.patients = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.error = 'Error fetching patients';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  deletePatient(id: string): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => this.fetchPatients(),
        error: (err) => console.error('Error deleting patient:', err)
      });
    }
  }

  startEdit(patient: any): void {
    this.editingPatientId = patient._id;
    this.editData = { ...patient }; // Clone to avoid two-way binding issue
  }

  cancelEdit(): void {
    this.editingPatientId = null;
    this.editData = { name: '', age: '', gender: '', phone: '' };
  }

  updatePatient(id: string): void {
    this.patientService.updatePatient(id, this.editData).subscribe({
      next: () => {
        this.fetchPatients();
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Error updating patient:', err);
      }
    });
  }

  goToAddPatient(): void {
    this.router.navigate(['/patients/add']); 
  }

  goToPatientDetail(id: string): void {
    this.router.navigate([`/patients/${id}`]); 
  }
}
