import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersRoleModoel } from 'src/app/Models/UsersRoleModel';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-users-role',
  templateUrl: './users-role.component.html',
  styleUrls: ['./users-role.component.css']
})
export class UsersRoleComponent implements OnInit {

  constructor(private service: AdminService,private route:Router) { }

  usersRole: UsersRoleModoel[];
  ngOnInit(): void {
    this.usersRole = [];

    this.GetRoleNameUsers();
  }


  GetRoleNameUsers() {
    this.service.GetUsersRole().subscribe(re => {
      this.usersRole = re;
      // console.log( this.usersRole)
    }, er => {
      console.log(er)
    })
  }

  gotoEditPage(userId: string,roleId:string) {
  
    this.route.navigate(['edit-user-role',userId,roleId])
  }

}
