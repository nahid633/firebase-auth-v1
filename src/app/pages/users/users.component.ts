import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RoleService} from '../../shared/services/role.service';
import {PermissionService} from '../../shared/services/permission.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  dataSource: any;
  refreshModes: string[];
  refreshMode: string;
  roleDataSource;

  hasPermission;
  dataSubscription: Subscription;
  checkPermissionSubscription: Subscription;
  roleSubscription: Subscription;
  constructor(private http: HttpClient, private userService: UserService, private roleService: RoleService , private permissionService: PermissionService) {
    this.refreshMode = 'reshape';
    this.refreshModes = ['full', 'reshape', 'repaint'];
  }
  ngOnInit(): void {
    this.dataSubscription = this.dataSource  = this.userService.getUsers().subscribe(res => {
      this.dataSource = res;
    });
    this.roleSubscription = this.roleService.getRoles().subscribe(res => {
      this.roleDataSource = res.map(r => r.name);
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
    this.userService.deleteUser(event.data.id);
  }
  onInsert(event) {
    const newUser = {email: event.data.email, role: event.data.role};
    this.userService.createUser(newUser);
  }
  onUpdate(event) {
    console.log(event);
    this.userService.updateUser(event.data);
  }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
