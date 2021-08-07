import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  isUserListShow: boolean;
  isAddUserShow: boolean;


  ngOnInit(): void {
    this.isUserListShow = false;
    this.isAddUserShow = false;
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });

  }

  UserListClick(): boolean {
    this.isAddUserShow = false;
    return this.isUserListShow = true;
  }

  AddUserClick(): boolean {
    this.isUserListShow = false;
    return this.isAddUserShow = true;

  }

}
