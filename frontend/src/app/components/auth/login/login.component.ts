import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: '',
  };

  errorMessage = '';

  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit(): void {
    // Check if user is already logged in
    if (localStorage.getItem('jwttoken')) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard if already logged in
    }
  }

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        console.log('Login response:', res);  // <-- Add this
        localStorage.setItem('jwttoken', res.user.token);
        localStorage.setItem('role', res.user.role);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed. Please try again.';
      },
    });
  }

}
