import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  private url = 'http://localhost:5000/api/appointments';

  constructor(private http: HttpClient) {}

  getAllAppointments(): Observable<any> {
    return this.http.get(this.url);
  }

  getAppointmentById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createAppointment(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }

  updateAppointment(id: string, data: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  
  getRecentAppointments(): Observable<any> {
    return this.http.get(`${this.url}/recent`);
  }

  getAppointmentsByDoctorId(doctorId: string): Observable<any> {
    return this.http.get(`${this.url}/doctor/${doctorId}`);
  }

}