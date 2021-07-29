import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from 'src/app/Models/registerModel';
import { Users } from 'src/app/Models/users';
import { RegisterService } from 'src/app/Service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private registerService: RegisterService
  ) {}

  reg: RegisterModel;
  registerForm: FormGroup;
  errorMsg: string;
  succsMsg: string = '';
  users: Users[];
  succsMsgReg = false;
  ngOnInit(): void {
    this.AllUsers();
    this.users = [];
    this.reg = {
      userName: '',
      email: '',
      password: '',
    };

    this.registerFormfunc();
    // console.log(this.registerForm.get('password')?.value);
  }

  registerFormfunc() {
    this.registerForm = this.form.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
      ConfirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.validRegsModel();
      this.registerService.register(this.reg).subscribe(
        (res) => {
          this.succsMsg = 'You have successfully registered';
          console.log(this.succsMsg);
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
      this.registerForm.reset();
      this.succsMsgReg=true;
      console.log(this.succsMsgReg)
    }

    // console.log(this.registerForm.value)
  }
  validRegsModel() {
    this.reg.userName = this.registerForm.value.userName;
    this.reg.email = this.registerForm.value.email;
    this.reg.password = this.registerForm.value.password;
  }
  validateConfirmPassword() {
    if (
      this.registerForm.value.password !==
      this.registerForm.value.ConfirmPassword
    ) {
      return false;
    } else {
      // console.log(this.registerForm.value.password)
      return true;
    }
  }

  AllUsers() {
    this.registerService.getAllUsers().subscribe(
      (res) => {
        this.users = res;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isUserExist() {
    for (const un of this.users) {
      const userN = this.registerForm.value.userName;
      if (userN === un.userName) {
        return true;
      }
      return false;
    }
    return false;
  }

  isEmailExist() {
    for (const em of this.users) {
      const userN = this.registerForm.value.email;
      if (userN === em.email) {
        return true;
      }
    }
    return false;
  }
}
