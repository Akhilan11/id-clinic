import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private url = 'https://id-clinic-backend.onrender.com/api/prescriptions';

  constructor(private http: HttpClient) {}

  // Add a new prescription
  addPrescription(prescription: any): Observable<any> {
    return this.http.post<any>(this.url, prescription);
  }

  // Get all prescriptions
  getAllPrescriptions(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  // Get a prescription by ID
  getPrescriptionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  // Update a prescription by ID
  updatePrescription(id: string, prescription: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, prescription);
  }

  // Delete a prescription by ID
  deletePrescription(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  // Get prescriptions for a specific patient (optional enhancement)
  getPrescriptionsByPatient(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/patient/${patientId}`);
  }
 
  // Get total number of prescriptions (optional enhancement)
  getPrescriptionsCount(): Observable<any> {
    return this.http.get<any>(`${this.url}/count`);
  }

}
