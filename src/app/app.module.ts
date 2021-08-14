import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UsersComponent } from './Admin/users/users.component';
import { AddUserComponent } from './Admin/users/add-user/add-user.component';
import { EditUserComponent } from './Admin/users/edit-user/edit-user.component';
import { UsersRoleComponent } from './Admin/users/users-role/users-role.component';
import { Page404Component } from './page404/page404.component';
import { Page403Component } from './page403/page403.component';
import { GurdsService } from './Service/gurds.service';
import { EditUserRoleComponent } from './Admin/users/edit-user-role/edit-user-role.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    DashboardComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    UsersRoleComponent,
    Page404Component,
    Page403Component,
    EditUserRoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [GurdsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
