import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from '../services';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn;
    const isLoginForm = route.routeConfig.path === 'login-form';
    if (isLoggedIn && isLoginForm) {
      this.router.navigate(['/']);
      return false;
    }

    if (!isLoggedIn && !isLoginForm) {
      this.router.navigate(['/login-form']);
    }

    return isLoggedIn || isLoginForm;
  }
}
