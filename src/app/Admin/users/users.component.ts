import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/Models/users';
import { AdminService } from 'src/app/Service/admin.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  isUserListShow: boolean;
  isAddUserShow: boolean;
  userId: string;
  users: Users[];
  active = false;
  ngOnInit(): void {
    this.active = true;
    this.getAllUsersCo();

    this.isAddUserShow = false;

  }

  getAllUsersCo() {
    this.adminService.getAllUsers().subscribe((res) => {
      this.users = res;
      // console.log(this.users)
    }, error => {
      console.log(error)
    })
  }



  edit(id: string) {
    // alert(id)
    this.router.navigate(['/admin/users/edit-user', id]);

  }




  AddUserClick(): boolean {
    this.isUserListShow = false;
    return this.isAddUserShow = true;

  }

  DeleteUser(id: string) {
    this.userId = id;

  }

  DeleteUserCinfirm() {
    this.adminService.DeleteUser(this.userId).subscribe(res => {
      console.log(res)
      document.getElementById("modelId")?.classList.remove("show")
      this.getAllUsersCo();

    }, er => {
      console.log(er)
      document.getElementById("modelId")?.classList.remove("show")

    })

    document.getElementById("modelId")?.classList.remove("show")

  }

  SelectAll() {

  }

}
