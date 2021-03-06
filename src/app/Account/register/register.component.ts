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
  ) { }

  reg: RegisterModel;
  registerForm: FormGroup;
  errorMsg: string;
  succsMsg: string = '';
  users: Users[];
  succsMsgReg = false;
  isUserExistOp = false;
  isEmailExistOp = false;
  isFormBusy: boolean;
   error1=false;
   errorMSG=''
  ngOnInit(): void {
    this.isFormBusy = false;
    this.AllUsers();
    this.users = [];
    this.reg = {
      userName: '',
      email: '',
      password: '',
    };

    this.registerFormfunc();
    this.formValueChange();
    // console.log(this.registerForm.get('password')?.value);
  }

  formValueChange() {

    this.registerForm.valueChanges.subscribe((res) => {
      if (this.registerForm.status == 'VALID') {
        console.log(this.registerForm);
        console.log("form valid");
        this.isFormBusy = true;
      }
    }, er => {
      console.log(er)
    })
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
    if (this.registerForm.valid && !this.isUserExistOp && !this.isEmailExistOp) {
      this.validRegsModel();
      this.registerService.register(this.reg).subscribe(
        (res) => {
          this.succsMsg = 'You have successfully registered';
          console.log(this.succsMsg);
          console.log(res);
          this.succsMsgReg = true;
        },
        (error) => {
           this.error1=true;
           this.errorMSG=error.error
          console.log(error.error);
        }
      );
      this.registerForm.reset();

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
        // console.log(this.users);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isUserExist() {
    const name = this.registerForm.value.userName;
    if (name != null && this.registerForm.get('userName')?.touched && name != '' && this.isFormBusy === false) {
      this.registerService.UserExists(name).subscribe((res) => {
        this.isUserExistOp = true;
        console.log('user is exist :'+this.isUserExistOp)
        console.log("saaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      }, er => {
        this.isUserExistOp = false;
        console.log('user is not exist :'+this.isUserExistOp)
      })
      return true

    }
    return false;

  }

  isEmailExist() {
    const email = this.registerForm.value.email;
    if (email != null && this.registerForm.get('email')?.touched && email != '' && this.isFormBusy === false) {
      this.registerService.EmailExists(email).subscribe((res) => {
        this.isEmailExistOp = true;
        console.log('email is exist :'+this.isEmailExistOp)
      }, er => {
        this.isEmailExistOp = false;
        console.log('email is not exist :'+this.isEmailExistOp)
      })
      return true;
    }
    return false;
  }
}
