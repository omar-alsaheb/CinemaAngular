import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from '../Models/actor';
import { AddUserModel } from '../Models/addUserModel';
import { Category } from '../Models/CategoryModel';
import { EditUserModel } from '../Models/EditUserModel';
import { EditUserRoleModel } from '../Models/EditUserRoleModel';
import { Movie } from '../Models/movieModel';
import { RoleModel } from '../Models/RoleModel';
import { SubCategory } from '../Models/SubCategoryModel';
import { Users } from '../Models/users';
import { UsersRoleModoel } from '../Models/UsersRoleModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {




  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44378/api/Admin';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  };



  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl + '/GetAllUsers', { withCredentials: true }).pipe();
  }

  GetUser(id: string): Observable<Users> {
    return this.http.get<Users>(this.baseUrl + '/GetUser/' + id, { withCredentials: true }).pipe();
  }

  AddNewUser(add: AddUserModel): Observable<AddUserModel> {
    return this.http
      .post<AddUserModel>(this.baseUrl + '/AddUser', add, this.headers)
      .pipe();
  }


  EditUser(editUseModel: EditUserModel): Observable<Users> {
    return this.http.put<Users>(this.baseUrl + '/EditUser/', editUseModel, this.headers).pipe();
  }

  DeleteUser(id: string) {
    return this.http.delete(this.baseUrl + '/DeleteUser/' + id).pipe();
  }

  GetUsersRole(): Observable<UsersRoleModoel[]> {
    return this.http.get<UsersRoleModoel[]>(this.baseUrl + '/GetRoleName/').pipe();
  }

  getUserRoleName(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(this.baseUrl + '/GetUserRole').pipe();
  }


  EditUserRole(editUserRoleModel: EditUserRoleModel): Observable<EditUserRoleModel> {
    return this.http.put<EditUserRoleModel>(this.baseUrl + '/EditUserRole/', editUserRoleModel, this.headers).pipe();
  }


  getAllcategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + '/GetAllCategory').pipe();
  }

  AddNewCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl + '/AddNewCategory', category, this.headers).pipe();
  }

  UpdateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.baseUrl + '/UpdateCategory', category, this.headers).pipe();
  }
  DeleteCategory(id: number) {
    return this.http.delete(this.baseUrl + '/DeleteCategory/' + id).pipe();
  }
  GetSubCategory(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.baseUrl + '/GetSubCategory').pipe();
  }

  AddSubCategory(Subcategory: SubCategory): Observable<SubCategory> {
    return this.http.post<SubCategory>(this.baseUrl + '/AddSubCategory', Subcategory, this.headers).pipe();
  }

  DeleteSubCategory(id: number) {
    return this.http.delete(this.baseUrl + '/DeleteSubCategory/' + id).pipe();
  }

  EditSubCategory(category: SubCategory): Observable<SubCategory> {
    return this.http.put<SubCategory>(this.baseUrl + '/EditSubCategory', category, this.headers).pipe();
  }

  AddActor(formData: FormData) {
    return this.http.post(this.baseUrl + '/AddActor', formData, { withCredentials: true }).pipe();
  }
  GetAllActors() :Observable<Actor[]>{
    return this.http.get<Actor[]>(this.baseUrl + '/GetActors', { withCredentials: true }).pipe();
  }

  GetActor(id: number):Observable<Actor>  {
    return this.http.get<Actor>(this.baseUrl + '/GetAcor/' + id).pipe();
  }
  EditActor(formData: FormData) {
    return this.http.put(this.baseUrl + '/EditActor', formData, { withCredentials: true }).pipe();
  }

  GetMovies() :Observable<Movie[]>{
    return this.http.get<Movie[]>(this.baseUrl + '/GetMovies', { withCredentials: true }).pipe();
  }
}
