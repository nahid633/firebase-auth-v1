import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DisplayDataComponent } from './pages/display-data/display-data.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import {RolesComponent} from './pages/roles/roles.component';
import {ShopsComponent} from './pages/shops/shops.component';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {UsersComponent} from './pages/users/users.component';
import {PermissionGuard} from './shared/guards/permission.guard';

const routes: Routes = [
  {
    path: 'display-data',
    component: DisplayDataComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [ AuthGuardService, PermissionGuard ]
  },
  {
    path: 'shops',
    component: ShopsComponent,
    canActivate: [ AuthGuardService, PermissionGuard ]
  }, {
    path: 'catalog',
    component: CatalogComponent,
    canActivate: [ AuthGuardService, PermissionGuard ]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [ AuthGuardService, PermissionGuard ]
  },
  {
    path: '**',
    redirectTo: 'home',
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, DisplayDataComponent]
})
export class AppRoutingModule { }
