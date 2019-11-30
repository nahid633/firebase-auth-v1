import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { RolesComponent } from './pages/roles/roles.component';
import {RoleService} from './shared/services/role.service';
import {DxButtonModule, DxDataGridModule, DxSelectBoxModule, DxTagBoxModule} from 'devextreme-angular';
import {HttpClientModule} from '@angular/common/http';
import { ShopsComponent } from './pages/shops/shops.component';
import { UsersComponent } from './pages/users/users.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import {PermissionService} from './shared/services/permission.service';
import {AuthGuardService} from './shared/guards/auth.guard';
import {PermissionGuard} from './shared/guards/permission.guard';

@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    ShopsComponent,
    UsersComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    LoginFormModule,
    AppRoutingModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxTagBoxModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, RoleService, PermissionService, PermissionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
