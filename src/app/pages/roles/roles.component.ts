import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoleService} from '../../shared/services/role.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import {PermissionService} from '../../shared/services/permission.service';
import {Subscription} from 'rxjs';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {

  dataSource: any;
  refreshModes: string[];
  refreshMode: string;
  permissions = [];
  dataSubscription: Subscription;
  permissionSubscription: Subscription;
  checkPermissionSubscription: Subscription;
  hasPermission;
  constructor(private http: HttpClient, private roleService: RoleService, private permissionService: PermissionService) {
    this.refreshMode = 'reshape';
    this.refreshModes = ['full', 'reshape', 'repaint'];
  }
  ngOnInit(): void {
    this.dataSubscription = this.dataSource  = this.roleService.getRoles().subscribe(res => {
      this.dataSource = res;
    });
    this.permissionSubscription = this.permissionService.getPermissions().subscribe(res => {
      this.permissions = res;
    });
    this.checkPermissionSubscription = this.permissionService.checkPermission('write').subscribe(res => {
      if (res) {
        this.hasPermission =  true;
      } else {
        this.hasPermission = false;
      }
    });
  }

  onRemove(event) {
    this.permissionService.checkPermission('write').subscribe(res => {
      if (res) {
        this.roleService.deleteRole(event.data.id);
      } else {
        notify('You dont have permission', 'error', 500);
      }
    });
  }
  onInsert(event) {
    const newRole = {id: event.data.name, name: event.data.name, description: event.data.description, priviliages: event.data.priviliages};
    this.permissionService.checkPermission('write').subscribe(res => {
      if (res) {
        this.roleService.createRole(newRole);
      } else {
        notify('You dont have permission', 'error', 500);
      }
    });
  }
  onUpdate(event) {
    const newRole = {id: event.data.name, name: event.data.name, description: event.data.description, priviliages: event.data.priviliages};
    this.permissionService.checkPermission('write').subscribe(res => {
      if (res) {
        this.roleService.updateRole(event.data);
      } else {
        notify('You dont have permission', 'error', 500);
      }
    });
  }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.permissionSubscription.unsubscribe();
    this.checkPermissionSubscription.unsubscribe();
  }
}
