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
  isShowEditUserComponent: boolean
  isCategoryShow: boolean;
  isSubCatShow: boolean;
  isActorListShow:boolean

  ngOnInit(): void {
    this.isUserListShow = false;
    this.isAddUserShow = false;
    this.isShowEditUserComponent = false;
    this.isSubCatShow = false;
    this.isActorListShow=false;
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });

    if (sessionStorage.getItem('editUserRole')) {
      this.ShowEditUserComponent();
      sessionStorage.removeItem('editUserRole')
    }
  }

  UserListClick(): boolean {
    this.isAddUserShow = false;
    this.isShowEditUserComponent = false;
    this.isCategoryShow = false;
    this.isSubCatShow = false
    return this.isUserListShow = true;
  }

  AddUserClick(): boolean {
    this.isUserListShow = false;
    this.isShowEditUserComponent = false;
    this.isSubCatShow = false
    this.isCategoryShow = false;
    return this.isAddUserShow = true;

  }

  ShowEditUserComponent() {
    this.isUserListShow = false;
    this.isAddUserShow = false;
    this.isSubCatShow = false
    this.isCategoryShow = false;
    return this.isShowEditUserComponent = true;
  }

  ShowCategory() {
    this.isUserListShow = false;
    this.isAddUserShow = false;
    this.isShowEditUserComponent = false;
    this.isSubCatShow = false
    return this.isCategoryShow = true;
  }
  ShowSubCat() {
    this.isUserListShow = false;
    this.isAddUserShow = false;
    this.isShowEditUserComponent = false;
    this.isCategoryShow = false;
    return this.isSubCatShow = true
  }

  showActorList(){
    this.isUserListShow = false;
    this.isAddUserShow = false;
    this.isShowEditUserComponent = false;
    this.isCategoryShow = false;
     this.isSubCatShow = false
     return this.isActorListShow = true
  }
}
