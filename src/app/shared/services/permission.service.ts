import { Output, Injectable, EventEmitter } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable, of} from 'rxjs';
import {permissions} from '../../app-permissions';
import {User} from '../entities/user';
import {AuthService} from './auth.service';
import {RoleService} from './role.service';

@Injectable()
export class PermissionService {

  constructor(private firestore: AngularFirestore, private authService: AuthService, private roleService: RoleService) {
  }

  checkPermission(permission: string): Observable<boolean> {
    const user = this.authService.userExists;
    return from(this.roleService.getRolePermission(user.role, permission));
  }

  getPermissions(): Observable<string[]> {
    return of(permissions);
  }
}
