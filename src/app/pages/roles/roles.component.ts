import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RoleService} from '../../shared/services/role.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  role = new FormGroup({
    name: new FormControl(''),
    descriptions: new FormControl(''),
    canRead: new FormControl(''),
    canWrite: new FormControl(false)
  });
  roles;

  constructor( private roleService: RoleService) {

  }
  ngOnInit() {
    this.roleService
      .getRoles()
      .subscribe(res => (this.roles = res));
  }
  onSubmit() {
    this.roleService.createRole('role')
      .then(res => {
        /*do something here....
        maybe clear the form or give a success message*/
      });
  }

}
