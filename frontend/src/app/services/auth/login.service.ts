import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'https://id-clinic-backend.onrender.com/api/auth'; // your auth backend

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, data).pipe(
      tap(res => {
        localStorage.setItem('jwttoken', res.token); // ✅ store token
        localStorage.setItem('username', res.user.name); 
        localStorage.setItem('email', data.email);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwttoken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }

  getToken(): string | null {
    return localStorage.getItem('jwttoken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
