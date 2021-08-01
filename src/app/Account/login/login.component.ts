import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/Models/loginModel';
import { AuthService } from 'src/app/Service/auth.service';
import { RegisterService } from 'src/app/Service/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private registerService: RegisterService,
    private route: Router,
    private auth: AuthService
  ) {}
  login: LoginModel;
  loginConfirmd = false;
  loginFials = false;
  ngOnInit(): void {
    this.auth.checkStorageEnc();


    this.loginForms();
    this.login = {
      email: '',
      password: '',
      remember: true,
    };
  }
  logninForm: FormGroup;

  onSubmit() {
    this.validLoginModel();
    // console.log(this.logninForm.value);
    if (this.logninForm.valid) {
      this.registerService.loginService(this.login).subscribe(
        (res) => {
          const rem: boolean = this.logninForm.value.remember;
          const email = this.logninForm.value.email;
          this.auth.initStorge(rem, email);
          // localStorage.setItem('email', this.logninForm.value.email);
          // const day = new Date();
          // if (rem) {
          //   day.setDate(day.getDate() + 10);
          // } else {
          //   day.setMinutes(day.getMinutes() + 30);
          // }
          // localStorage.setItem('expir', day.toDateString());
          // this.getRoleName();
          this.loginConfirmd = true;
          this.loginFials = false;
          this.logninForm.reset();

          // this.route.navigate(['home'])
        },
        (error) => {
          // console.log(error);
          this.loginFials = true;
        }
      );
    }
  }

  // getRoleName() {
  //   this.registerService.getRoleName(this.logninForm.value.email).subscribe(
  //     (r) => {
  //       localStorage.setItem('roleName', r.toString());
  //       console.log(r);
  //     },
  //     (e) => {
  //       console.log(e);
  //     }
  //   );
  // }
  loginForms() {
    this.logninForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: true,
    });
  }

  validLoginModel() {
    this.login.email = this.logninForm.value.email;
    this.login.password = this.logninForm.value.password;
    this.login.remember = this.logninForm.value.remember;
  }
}
