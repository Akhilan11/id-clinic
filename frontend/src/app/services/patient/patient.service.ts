import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private url : string = 'https://id-clinic-backend.onrender.com/api/patients';

  constructor(private http : HttpClient) { }

  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getPatientById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  addPatient(patient: any): Observable<any> {
    return this.http.post<any>(this.url, patient);
  }

  updatePatient(id: string, patient: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, patient);
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  searchPatientsByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.url}/search?name=${name}`);
  }

  searchPatientsByPhone(phone: string): Observable<any> {
    return this.http.get<any>(`${this.url}/search?phone=${phone}`);
  }

  getPatientsCount(): Observable<any> {
    return this.http.get<any>(`${this.url}/count`);
  }

  classifyPatientByGender(): Observable<any> {
    return this.http.get<any>(`${this.url}/gender`);
  }

  getRecentAppointment(): Observable<any> {
    return this.http.get<any>(`${this.url}/recent`);
  }

}
