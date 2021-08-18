import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './Account/register/register.component';
import { AddActorComponent } from './Admin/Actors/add-actor/add-actor.component';
import { AddCategoryComponent } from './Admin/Categories/add-category/add-category.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { SubCategoryComponent } from './Admin/SubCategories/sub-category/sub-category.component';
import { AddUserComponent } from './Admin/users/add-user/add-user.component';
import { EditUserRoleComponent } from './Admin/users/edit-user-role/edit-user-role.component';
import { EditUserComponent } from './Admin/users/edit-user/edit-user.component';
import { UsersRoleComponent } from './Admin/users/users-role/users-role.component';
import { UsersComponent } from './Admin/users/users.component';
import { HomeComponent } from './home/home.component';

import { Page403Component } from './page403/page403.component';
import { Page404Component } from './page404/page404.component';
import { GurdsService } from './Service/gurds.service';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin/dashboard',component:DashboardComponent,canActivate:[GurdsService]},
  {path:'admin/users',component:UsersComponent},
  {path:'admin/users/add-user',component:AddUserComponent},
  {path:'admin/users/edit-user/:id',component:AddUserComponent},
  {path:'admin/users/users-role',component:UsersRoleComponent},
  {path:'page-not-found',component:Page404Component},
  {path:'page-access-denied',component:Page403Component},
  {path:'edit-user-role/:id/:id1',component:EditUserRoleComponent},
  {path:'add-category',component:AddCategoryComponent},
  {path:'editcategory/:id/:id1',component:AddCategoryComponent},
  {path:'add-subCategory',component:SubCategoryComponent},
  {path:'edit-sub-cat/:id/:name/:id1',component:SubCategoryComponent},
  {path:'add-actor',component:AddActorComponent},
  {path:'edit-actor/:id',component:AddActorComponent},



  {path:'',component:HomeComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
