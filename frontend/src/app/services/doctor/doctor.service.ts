import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private url: string = 'https://id-clinic-backend.onrender.com/api/doctors';

  constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getDoctorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  addDoctor(doctor: any): Observable<any> {
    return this.http.post<any>(this.url, doctor);
  }

  updateDoctor(id: string, doctor: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, doctor);
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  getDoctorsCount(): Observable<any> { 
    return this.http.get<any>(`${this.url}/count`);
  } 

}