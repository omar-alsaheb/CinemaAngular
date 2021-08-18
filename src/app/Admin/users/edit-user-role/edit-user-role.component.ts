import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditUserRoleModel } from 'src/app/Models/EditUserRoleModel';
import { RoleModel } from 'src/app/Models/RoleModel';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-edit-user-role',
  templateUrl: './edit-user-role.component.html',
  styleUrls: ['./edit-user-role.component.css']
})
export class EditUserRoleComponent implements OnInit {

  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private router: Router, private service: AdminService) { }

  userId: string;
  roleId: any;
  roleForm: FormGroup;
  userName: string;
  roleName: string;
  roleModel: RoleModel[];
  userRole: EditUserRoleModel;

  ngOnInit(): void {
    this.activeRoutes();
    this.initFormRole();
    this.userRole = {
      roleId: '',
      userId: ''
    }


  }


  EditRole() {

    if (this.roleId && this.userId && this.roleForm.valid) {
      this.userRole.roleId = this.roleId;
      this.userRole.userId = this.userId;
      // console.log(this.roleForm.value)
      this.service.EditUserRole(this.userRole).subscribe(r => {
        sessionStorage.setItem('editUserRole','true');
        this.router.navigate(['admin/dashboard'])
      }, e => {
        console.log(e)
      })
    }

  }

  activeRoutes() {

    this.activeRoute.paramMap.subscribe(param => {
      let userId = param.get('id');
      let roleId = param.get('id1');
      if (userId && roleId) {
        this.service.GetUser(userId).subscribe(res => {
          this.getRoleName();

          this.userId = res.id;
          this.userName = res.userName;
          console.log("user name " + this.userName)
          this.roleId = roleId;
          this.addUserRole();
          // console.log(userId, roleId)
        }, e => {
          console.log(e)
          this.router.navigate(['page-not-found']).then(x => window.location.reload())
        })

      }
      else {
        this.router.navigate(['page-not-found']).then(x => window.location.reload())
      }
    })
  }

  initFormRole() {
    this.roleForm = this.fb.group({
      userName: ['', Validators.required],
      roleName: ['', Validators.required],


    });
  }

  addUserRole() {
    this.roleForm.setValue({
      userName: this.userName,
      roleName: this.roleId

    })
  }

  getRoleName() {
    this.service.getUserRoleName().subscribe(r => {
      this.roleModel = r;
      // console.log(this.roleModel)
    }, e => {
      console.log(e)
    })
  }


  onRoleChange() {
    this.roleId = this.roleForm.value.roleName;
    console.log(this.roleId)
  }
}
