import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('jwttoken');
    const role = localStorage.getItem('role'); // Make sure you're storing this key on login

    const allowedRoles = route.data['roles'] as string[];

    if (token && role && allowedRoles.includes(role)) {
      return true;
    }

    this.router.navigate(['/unauthorized']); // Create this route/component if not done
    return false;
  }
}
