import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../../../services/prescription/prescription.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prescription-detail',
  templateUrl: './prescription-detail.component.html',
  styleUrls: ['./prescription-detail.component.css']
})
export class PrescriptionDetailComponent implements OnInit {

  prescription: any;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prescriptionService: PrescriptionService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.prescriptionService.getPrescriptionById(id).subscribe({
        next: (data) => {
          this.prescription = data;
          this.isLoading = false; 
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/patients', this.prescription.patient._id])
  }
}
