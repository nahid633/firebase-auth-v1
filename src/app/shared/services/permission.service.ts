import { Output, Injectable, EventEmitter } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {permissions} from '../../app-permissions';
import {User} from '../entities/user';
import {AuthService} from './auth.service';
import {RoleService} from './role.service';

@Injectable()
export class PermissionService {

  constructor(private firestore: AngularFirestore, private authService: AuthService, private roleService: RoleService) {
  }

  checkPermission(permission: string): Observable<boolean> {
    this.authService.userExists.subscribe(user => {
      if (!user) {
        return of(false);
      }
      return this.roleService.getRolePermission(user.role, permission);
    });
    return of(false);
  }

  getPermissions(): Observable<string[]> {
    return of(permissions);
  }
}
