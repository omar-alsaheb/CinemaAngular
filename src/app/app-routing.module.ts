import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AddUserComponent } from './Admin/users/add-user/add-user.component';
import { EditUserComponent } from './Admin/users/edit-user/edit-user.component';
import { UsersComponent } from './Admin/users/users.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin/dashboard',component:DashboardComponent},
  {path:'admin/users',component:UsersComponent},
  {path:'admin/users/add-user',component:AddUserComponent},
  {path:'admin/users/edit-user/:id',component:AddUserComponent},
  {path:'',component:HomeComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
