import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUserModel } from 'src/app/Models/addUserModel';
import { EditUserModel } from 'src/app/Models/EditUserModel';
import { RegisterModel } from 'src/app/Models/registerModel';
import { Users } from 'src/app/Models/users';
import { AdminService } from 'src/app/Service/admin.service';
import { RegisterService } from 'src/app/Service/register.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private form: FormBuilder,
    private registerService: RegisterService,
    private adminService: AdminService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  Country = ['', 'Jordan', 'KSA', 'Pal', 'Iraq'];
  userId: string;
  titlePage = "Add New User";
  titleButton = "Add new user";
  addUser: AddUserModel;
  // reg: RegisterModel;
  registerForm: FormGroup;
  errorMsg: string;
  succsMsg: string = '';
  users: Users[];
  succsMsgReg = false;
  isUserExistOp = false;
  isEmailExistOp = false;
  isFormBusy: boolean;
  userData: Users;
  isUpdateMode: boolean;
  editUserModel: EditUserModel;
  id: string | any;
  ngOnInit(): void {
    this.id = '';
    this.editUserModel= {
      id:"",
      userName:"",
      email:"",
      emailConfirmed:true,
      password:"",
      phoneNumber:"",
      country:""
    }
    // this.userData = null;
    this.isUpdateMode = false;
    this.userId = '';
    this.isFormBusy = false;
    this.AllUsers();
    this.users = [];
    this.addUser = {
      userName: '',
      email: '',
      // emailConfirmed:true,
      password: '',
      phoneNumber: '',
      country: '',
    };

    this.registerFormfunc();
    this.formValueChange();
    this.activeRouteFunc();
    // console.log(this.registerForm.get('password')?.value);
  }

  onSubmit() {
    if (this.registerForm.valid && !this.isUserExistOp && !this.isEmailExistOp) {
      if (!this.isUpdateMode) {
        this.validRegsModel();
        // console.log(this.registerForm.value)
        this.adminService.AddNewUser(this.addUser).subscribe(
          (res) => {
            this.succsMsg = 'You have successfully registered';
            console.log(this.succsMsg);
            // console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
        this.registerForm.reset();
        this.succsMsgReg = true;
        console.log(this.succsMsgReg)
      }
      else {
        this.validEditUserModel();
        this.adminService.EditUser(this.editUserModel).subscribe(res => {
          console.log(res)
          console.log("Done")
        }, er => {
          console.log("Error")
          console.log(er)
        })
        console.log(this.registerForm.value)
      }
    }

    // console.log(this.registerForm.value)
  }


  validRegsModel() {
    this.addUser.userName = this.registerForm.value.userName;
    this.addUser.email = this.registerForm.value.email;
    this.addUser.phoneNumber = this.registerForm.value.phoneNumber;
    this.addUser.country = this.registerForm.value.country;
    this.addUser.password = this.registerForm.value.password;
  }
  validEditUserModel() {
    this.editUserModel.id = this.id;
    this.editUserModel.userName = this.registerForm.value.userName;
    this.editUserModel.email = this.registerForm.value.email;
    this.editUserModel.phoneNumber = this.registerForm.value.phoneNumber;
    this.editUserModel.country = this.registerForm.value.country;
    this.editUserModel.password = this.registerForm.value.password;
  }

  activeRouteFunc() {
    this.activeRoute.paramMap.subscribe(param => {

      let id = param.get('id');
      if (id) {
        this.adminService.GetUser(id).subscribe(res => {
          // console.log(res)
          this.isUpdateMode = true;
          this.userData = res;
          this.titlePage = "Update User";
          this.titleButton = "Update User";
          this.UpdateUserData();
          this.id = id;
        }, er => {
          console.log(er)
          this.router.navigate(['/home'])
        })

        this.userId = id;
      }

    }, error => {
      console.log(error)
    })
  }
  UpdateUserData() {
    if (this.userData !== null) {
      this.registerForm.patchValue({
        userName: this.userData.userName,
        email: this.userData.email,
        password: this.userData.passwordHash,
        phoneNumber: this.userData.phoneNumber,
        country: this.userData.country

      })

    }
  }

  formValueChange() {
    this.registerForm.valueChanges.subscribe((res) => {
      if (this.registerForm.status == 'VALID') {
        console.log(this.registerForm);
        console.log("form valid");
        this.isFormBusy = true;
      }
    }, er => {
      console.log("form is not valid");
      console.log(er)
    })
  }

  registerFormfunc() {
    this.registerForm = this.form.group({
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ]
      ],
      ConfirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ]
      ],
    });
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

  // isUserExist1() {
  //   var name = this.registerForm.value.userName;

  //   if (name !== null && name !== '') {

  //     for (const user of this.users.values()) {
  //       if (this.isUpdateMode && user.userName === name && user.id == this.userData.id) {
  //         console.log("omar")
  //         console.log(this.isUpdateMode)
  //         this.isUserExistOp = false;

  //       }
  //       else if (this.isUpdateMode && user.userName === name && user.id !== this.userData.id) {
  //         console.log("alsaheb")
  //         console.log(this.isUpdateMode)
  //         this.isUserExistOp = true;
  //       }

  //     }

  //   }

  //   return false;
  // }


  isUserExist() {
    const name = this.registerForm.value.userName;
    if (name != null && this.registerForm.get('userName')?.touched && name != '' && this.isFormBusy === false) {
      this.registerService.UserExists(name).subscribe((res) => {
        for (const user of this.users.values()) {
          if (this.isUpdateMode && user.userName === name && user.id == this.userData.id) {
            this.isUserExistOp = false;
          }
          else if (this.isUpdateMode && user.userName === name && user.id !== this.userData.id) {
            this.isUserExistOp = true;

          }
          else if (!this.isUpdateMode) {
            this.isUserExistOp = true;
          }
        }

      }, er => {
        this.isUserExistOp = false;

      })
      return true

    }
    return false;

  }



  isEmailExist() {
    const email = this.registerForm.value.email;
    if (email != null && this.registerForm.get('email')?.touched && email != '' && this.isFormBusy === false) {
      this.registerService.EmailExists(email).subscribe((res) => {
        for (const user of this.users.values()) {
          if (this.isUpdateMode && user.email === email && user.id == this.userData.id) {
            this.isUserExistOp = false;
          }
          else if (this.isUpdateMode && user.email === email && user.id !== this.userData.id) {
            this.isEmailExistOp = true;

          }
          else if (!this.isUpdateMode) {
            this.isEmailExistOp = true;
          }
        }
        // console.log('email is exist :'+this.isEmailExistOp)
      }, er => {
        this.isEmailExistOp = false;
        // console.log('email is not exist :'+this.isEmailExistOp)
      })
      return true;
    }
    return false;
  }




  // isEmailExist() {
  //   const email = this.registerForm.value.email;
  //   if (email != null && this.registerForm.get('email')?.touched && email != '' && this.isFormBusy === false) {
  //     this.registerService.EmailExists(email).subscribe((res) => {
  //       this.isEmailExistOp = true;
  //       console.log('email is exist :'+this.isEmailExistOp)
  //     }, er => {
  //       this.isEmailExistOp = false;
  //       console.log('email is not exist :'+this.isEmailExistOp)
  //     })
  //     return true;
  //   }
  //   return false;
  // }






}



