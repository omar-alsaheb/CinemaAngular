import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUserModel } from '../Models/addUserModel';
import { EditUserModel } from '../Models/EditUserModel';
import { RoleModel } from '../Models/RoleModel';
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
    return this.http.get<Users[]>(this.baseUrl + '/GetAllUsers',{withCredentials: true}).pipe();
  }

  GetUser(id:string): Observable<Users> {
    return this.http.get<Users>(this.baseUrl +  '/GetUser/'+id,{withCredentials: true}).pipe();
  }

  AddNewUser(add: AddUserModel): Observable<AddUserModel> {
    return this.http
      .post<AddUserModel>(this.baseUrl + '/AddUser', add, this.headers)
      .pipe();
  }


  EditUser(editUseModel:EditUserModel): Observable<Users> {
    return this.http.put<Users>(this.baseUrl +  '/EditUser/',editUseModel,this.headers).pipe();
  }

  DeleteUser(id:string){
    return this.http.delete(this.baseUrl + '/DeleteUser/'+id).pipe();
  }

  GetUsersRole(): Observable<UsersRoleModoel[]> {
    return this.http.get<UsersRoleModoel[]>(this.baseUrl +  '/GetRoleName/').pipe();
  }

  getUserRoleName(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(this.baseUrl + '/GetUserRole').pipe();
  }

}
