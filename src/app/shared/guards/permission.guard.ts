import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services';
import {PermissionService} from '../services/permission.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private router: Router, private permissionService: PermissionService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.permissionService.checkPermission('read').pipe(map(res => {
      if (res) {
        return true;
      } else {
        this.router.navigate(['/login-form']);
        return false;

      }
    }));
  }

}
