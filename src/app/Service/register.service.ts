import { Injectable } from '@angular/core';
import { RegisterModel } from '../Models/registerModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../Models/users';
import { LoginModel } from '../Models/loginModel';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://localhost:44378/api/Account/';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  register(reg: RegisterModel): Observable<RegisterModel> {
    return this.http
      .post<RegisterModel>(this.baseUrl + 'Register', reg, this.headers)
      .pipe();
  }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl + 'GetAllUsers').pipe();
  }

  loginService(login: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(this.baseUrl + 'Login', login,this.headers).pipe();
  }

  Logout() {
    return this.http.get<LoginModel>(this.baseUrl + 'Logout').pipe();
  }

  getRoleName(email: string) {
    return this.http
      .get(this.baseUrl + 'GetRoleName/' + email,{responseType:'text'})
      .pipe();
  }
}
