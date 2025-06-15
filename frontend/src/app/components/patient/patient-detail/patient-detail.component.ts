import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient/patient.service';
import { PrescriptionService } from '../../../services/prescription/prescription.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrl: './patient-detail.component.css'
})

export class PatientDetailComponent implements OnInit {

  patient: any;
  isLoading: boolean = true;
  error: string = '';

  prescriptions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private prescriptionService: PrescriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Get patient
      this.patientService.getPatientById(id).subscribe({
        next: (data) => {
          this.patient = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to fetch patient details';
          this.isLoading = false;
          console.error(err);
        }
      });

      // Get prescriptions
      this.prescriptionService.getPrescriptionsByPatient(id).subscribe({
        next: (data) => {
          this.prescriptions = data;
        },
        error: (err) => {
          console.error('Failed to fetch prescriptions', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/patients']);
  }

  goToAddPrescription(): void {
    this.router.navigate(['/prescription/add', this.patient._id]);
  }
  
}