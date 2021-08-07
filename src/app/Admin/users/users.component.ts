import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/Models/users';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  isUserListShow: boolean;
  isAddUserShow: boolean;

  users: Users[];
  ngOnInit(): void {
    this.getAllUsersCo();

    this.isAddUserShow = false;

  }

  getAllUsersCo() {
    this.adminService.getAllUsers().subscribe((res) => {
      this.users=res;
      // console.log(this.users)
    }, error => {
      console.log(error)
    })
  }








  AddUserClick(): boolean {
    this.isUserListShow = false;
    return this.isAddUserShow = true;

  }
}
