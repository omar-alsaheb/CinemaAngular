import { Injectable } from '@angular/core';
import { RegisterModel } from '../Models/registerModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../Models/users';
import { LoginModel } from '../Models/loginModel';
import { AddUserModel } from '../Models/addUserModel';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:44378/api/Account';
  baseUrlAdmin = 'https://localhost:44378/api/Admin';

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true
  };

  register(reg: RegisterModel): Observable<RegisterModel> {
    return this.http
      .post<RegisterModel>(this.baseUrl + '/Register', reg, this.headers)
      .pipe();
  }


  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl + '/GetAllUsers').pipe();
  }

  loginService(login: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(this.baseUrl + '/Login', login, this.headers).pipe();
  }

  Logout() {
    return this.http.get<LoginModel>(this.baseUrl + '/Logout', { withCredentials: true }).pipe();
  }

  getRoleName(email: string) {
    return this.http
      .get(this.baseUrl + '/GetRoleName' + email, { responseType: 'text' })
      .pipe();
  }

  UserExists(username: string) {
    return this.http.get(this.baseUrl + '/UserExists?username=' + username).pipe();
  }
  EmailExists(email: string) {
    return this.http.get(this.baseUrl + '/EmailExists?email=' + email).pipe();
  }

  //i don't do the email confirm
  //https://www.youtube.com/watch?v=pJ-akbDROA0&list=PLNALJ4Pk9-GwTELSBAZaBrOr7gXlmEPaZ&index=24

  //Forget passowrd using email
  //https://www.youtube.com/watch?v=kwz3VFMx2l8&list=PLNALJ4Pk9-GwTELSBAZaBrOr7gXlmEPaZ&index=26

  //I don't do the rest password
  //https://www.youtube.com/watch?v=xNyq3w3GYeU&list=PLNALJ4Pk9-GwTELSBAZaBrOr7gXlmEPaZ&index=28

}
