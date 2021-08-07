import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUserModel } from '../Models/addUserModel';
import { Users } from '../Models/users';

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
  AddNewUser(add: AddUserModel): Observable<AddUserModel> {
    return this.http
      .post<AddUserModel>(this.baseUrl + '/AddUser', add, this.headers)
      .pipe();
  }

}
