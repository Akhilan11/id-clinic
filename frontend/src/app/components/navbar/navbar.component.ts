import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // userRole = localStorage.getItem('role');

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwttoken');
  }

  get userRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.removeItem('jwttoken');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
