import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../services/appointment/appointment.service';
import { DoctorService } from '../../../services/doctor/doctor.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointment: any = {
    patientName: '',
    doctorId: '',
    dateTime: '',
    reason: '',
    status: 'Pending'
  };

  selectedDate: string = '';
  selectedTime: string = '';
  minDate: string = '';
  timeSlots: string[] = [];
  doctors: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.doctorService.getAllDoctors().subscribe({
      next: res => {
        this.doctors = res;
      },
      error: err => alert('Error: ' + err.error.error)
    });

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  generateTimeSlots() {
    this.timeSlots = [];
    this.selectedTime = '';

    if (!this.selectedDate) return;

    const now = new Date();
    const selected = new Date(this.selectedDate + 'T00:00');
    const isToday = now.toDateString() === selected.toDateString();

    const startHour = 18;
    const endHour = 21;

    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += 15) {
        const slotTime = new Date(selected);
        slotTime.setHours(h, m, 0, 0);

        if (isToday && slotTime <= now) continue;

        const timeString = slotTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        this.timeSlots.push(timeString);
      }
    }
  }

  selectTime(time: string) {
    this.selectedTime = time;

    const date = new Date(this.selectedDate + ' ' + time);
    this.appointment.dateTime = date.toISOString();
  }

  resetForm() {
    this.appointment = {
      patientName: '',
      doctorId: '',
      dateTime: '',
      reason: '',
      status: 'Pending'
    };
    this.selectedDate = '';
    this.selectedTime = '';
    this.timeSlots = [];
  }

  onSubmit() {
    if (!this.appointment.dateTime) {
      alert('Please select a valid date and time.');
      return;
    }

    this.appointmentService.createAppointment(this.appointment).subscribe({
      next: res => {
        alert('Appointment created');
        this.resetForm();
      },
      error: err => alert('Error: ' + err.error.error)
    });
  }
}
