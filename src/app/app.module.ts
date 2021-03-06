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
import { CategoryListComponent } from './Admin/Categories/category-list/category-list.component';
import { AddCategoryComponent } from './Admin/Categories/add-category/add-category.component';
import { SubCategoryComponent } from './Admin/SubCategories/sub-category/sub-category.component';
import { SubCategoryListComponent } from './Admin/SubCategories/sub-category-list/sub-category-list.component';
import { ActorListComponent } from './Admin/Actors/actor-list/actor-list.component';
import { AddActorComponent } from './Admin/Actors/add-actor/add-actor.component';
import { MovieListComponent } from './Admin/Movies/movie-list/movie-list.component';
import { AddMovieComponent } from './Admin/Movies/add-movie/add-movie.component';


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
    CategoryListComponent,
    AddCategoryComponent,
    SubCategoryComponent,
    SubCategoryListComponent,
    ActorListComponent,
    AddActorComponent,
    MovieListComponent,
    AddMovieComponent,
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
