import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptService } from './crypt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private crypto: CryptService) { }
  baseUrl = 'https://localhost:44378/api/Account/';

  roleName:string;

  initStorge(rem: boolean, email: string) {
    const day = new Date();
    if (rem) {
      day.setDate(day.getDate() + 10);
    } else {
      day.setMinutes(day.getMinutes() + 30);
    }
    localStorage.setItem('email', this.crypto.Encrypt(email));
    localStorage.setItem('expir', this.crypto.Encrypt(day.toString()));
    this.getRoleNameFunc(email);
  }

  public checkStorageEnc() {
    if (
      !!localStorage.getItem('email') &&
      !!localStorage.getItem('roleName') &&
      !!localStorage.getItem('expir')
    ) {

      const email = this.crypto.Decrypt(localStorage.getItem('email'));
      this.roleName = this.crypto.Decrypt(localStorage.getItem('roleName'));
      const expir = this.crypto.Decrypt(localStorage.getItem('expir'));
      if (email != null && this.roleName != null && expir != null) {
        console.log(this.roleName,email);

        this.ValidateUser(email, this.roleName).subscribe(
          (r) => {
            console.log("user auth");
          },
          (er) => {
            console.log(er);
          }
        );
      }
    }
  }
  getRoleNameFunc(email: string) {
    this.getRoleName(email).subscribe(
      (r) => {
        localStorage.setItem('roleName', this.crypto.Encrypt(r));
        this.roleName = r;
        
      },
      (e) => {
        console.log(e);
      }
    );
  }


  // to controle expier date for Credentials
  //https://youtu.be/mCEWA0DgCEE?t=1456


  getRoleName(email: string) {
    return this.http
      .get(this.baseUrl + 'GetRoleName/' + email, { responseType: 'text' })
      .pipe();
  }

  ValidateUser(email: string, role: string) {
    return this.http
      .get(
        this.baseUrl +
        'CheckUserClaims/' + email + '&' + role, { withCredentials: true }
      )
      .pipe();
  }
}
