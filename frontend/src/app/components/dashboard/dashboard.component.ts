import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient/patient.service';
import { DoctorService } from '../../services/doctor/doctor.service';
import { PrescriptionService } from '../../services/prescription/prescription.service';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patientsCount = 0;
  doctorsCount = 0;
  prescriptionsCount = 0;
  totalMalePatients = 0;
  totalFemalePatients = 0;
  username : string = ''

  // Pie Chart for Gender Distribution
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  };
  pieChartType: ChartType = 'pie';

  // Line Chart for Recent Appointments
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Appointments',
        fill: false,
        borderColor: '#42A5F5',
        backgroundColor: '#90CAF9',
        tension: 0.4
      }
    ]
  };
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };
  lineChartType: 'line' = 'line';

  recentAppointments : any[] = []

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private prescriptionService: PrescriptionService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.patientService.getPatientsCount().subscribe({
      next: data => this.patientsCount = data.count,
      error: err => console.error('Error fetching patients count:', err)
    });

    this.doctorService.getDoctorsCount().subscribe({
      next: data => this.doctorsCount = data.count,
      error: err => console.error('Error fetching doctors count:', err)
    });

    this.prescriptionService.getPrescriptionsCount().subscribe({
      next: data => this.prescriptionsCount = data.total,
      error: err => console.error('Error fetching prescriptions count:', err)
    });

    this.patientService.classifyPatientByGender().subscribe({
      next: data => {
        this.totalMalePatients = data.male;
        this.totalFemalePatients = data.female;
        this.pieChartData.datasets[0].data = [data.male, data.female];
      },
      error: err => console.error('Error fetching gender distribution:', err)
    });

    this.appointmentService.getRecentAppointments().subscribe({
      next: (res: any) => this.processAppointmentData(res.data),
      error: err => console.error('Error fetching recent appointments:', err)
    });

    this.appointmentService.getAllAppointments().subscribe({
      next: (res: any) => {
        // Sort by dateTime descending and take only the first 3
        const sorted = res.sort((a: any, b: any) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
        this.recentAppointments = sorted.slice(0, 3); // 🔥 Limit to 
        this.processAppointmentData(res); // If needed for charts
      },
      error: err => console.error('Error fetching appointments:', err)
    });

    this.username = localStorage.getItem('username') || 'User';
  }

  private processAppointmentData(data: Array<{ _id: string; count: number }>) {
    const last7Days = this.getLast7DaysArray();
    const countsByDate: { [date: string]: number } = {};

    data.forEach(item => {
      countsByDate[item._id] = item.count;
    });

    const labels = last7Days;
    const counts = labels.map(date => countsByDate[date] || 0);

    this.lineChartData.labels = labels;
    this.lineChartData.datasets[0].data = counts;
  }

  private getLast7DaysArray(): string[] {
    const arr: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      arr.push(d.toISOString().split('T')[0]);
    }
    return arr;
  }
}
