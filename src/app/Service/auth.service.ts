import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptService } from './crypt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private crypto: CryptService) { }
  baseUrl = 'https://localhost:44378/api/Account/';

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
      const roleName = this.crypto.Decrypt(localStorage.getItem('roleName'));
      const expir = this.crypto.Decrypt(localStorage.getItem('expir'));
      if (email != null && roleName != null && expir != null) {
        console.log(roleName);

        this.ValidateUser(email, roleName).subscribe(
          (r) => {
            console.log(r);
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
        console.log(r);
      },
      (e) => {
        console.log(e);
      }
    );
  }

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
