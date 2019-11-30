import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoleService} from '../../shared/services/role.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import {PermissionService} from '../../shared/services/permission.service';
import {Subscription} from 'rxjs';

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
  }
  onRemove(event) {
    this.roleService.deleteRole(event.data.id);
  }
  onInsert(event) {
    const newRole = {id: event.data.name, name: event.data.name, description: event.data.description, priviliages: event.data.priviliages};
    this.roleService.createRole(newRole);
  }
  onUpdate(event) {
    console.log(event.data);
    this.roleService.updateRole(event.data);
  }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.permissionSubscription.unsubscribe();
  }
}
