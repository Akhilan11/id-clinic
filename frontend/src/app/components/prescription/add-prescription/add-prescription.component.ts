import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../../../services/prescription/prescription.service';
import { PatientService } from '../../../services/patient/patient.service';
import { DoctorService } from '../../../services/doctor/doctor.service';

// const html2pdf = require('html2pdf.js');
import html2canvas from 'html2canvas';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';

// Add the necessary imports
declare var html2pdf: any;

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css'] // fixed typo
})

export class AddPrescriptionComponent implements OnInit {

  prescription: {
  patient: string;
  doctor: string;
  date_prescribed: string;
  left_eye: {
    sphere: string;
    cylinder: string;
    axis: string;
  },
  right_eye: {
    sphere: string;
    cylinder: string;
    axis: string;
  },
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  vision_right : string;
  vision_left : string;
  instructions: string;
  diagnosis: string;
  } = {
    patient: '',
    doctor: '',
    date_prescribed : new Date().toISOString().split('T')[0], 
    left_eye: {
      sphere: '',
      cylinder: '',
      axis: ''
    },
    right_eye: {
      sphere: '',
      cylinder: '',
      axis: ''
    },
    medications: [],
    vision_left : '',
    vision_right : '',
    instructions: '',
    diagnosis: ''
  };

  showSpecs: boolean = false;
  patient: any;

  doctors: any[] = [];
  

  isMedInputLocked = false;
  

  constructor(
    private prescriptionService: PrescriptionService,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    // Get patient ID from route and assign to prescription
    const patientId = this.route.snapshot.paramMap.get('id');
    if (patientId) {
      // this.patient = patientId;
      // alert(this.patient);
      this.patientService.getPatientById(patientId).subscribe({
        next: (data) => {
          this.patient = data;
          this.prescription.patient = data._id || data.id || patientId;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    // Fetch all doctors
    this.doctorService.getAllDoctors().subscribe((res) => {
      this.doctors = res;
    });
  }

  addMedication(): void {
    this.prescription.medications.push({
      name: '',
      dosage: '',
      frequency: '',
      duration: ''
    });
  }

  removeMedication(index: number): void {
    this.prescription.medications.splice(index, 1);
    this.isMedInputLocked = false;
  }

  submitPrescription(): void {
    this.prescriptionService.addPrescription(this.prescription).subscribe({
      next: () => {
        alert('Prescription added successfully!');
        this.router.navigate(['/patients']); // adjust route if needed
      },
      error: (err) => {
        console.error('Error adding prescription:', err);
        alert('Failed to add prescription.');
      }
    });
  }

  toggleSpecs(): void {
    this.showSpecs = !this.showSpecs;
  }

  getSelectedDoctor() {
    return this.doctors.find(d => d._id === this.prescription.doctor);
  }

  async downloadPDF() {
    const element = document.getElementById('prescription-template');
    if (!element) {
      alert('Could not find prescription element to export!');
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        ignoreElements: (el) => el.classList?.contains('pdf-ignore'),
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10; // in mm
      const imgProps = pdf.getImageProperties(imgData);

      // Calculate image dimensions within margin constraints
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
      pdf.save(`${this.patient.name || 'prescription'}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF.');
    }
  }


  goBack() {
    this.router.navigate(['/patients', this.patient._id]);
  }

}
