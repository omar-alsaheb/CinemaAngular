import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../Service/register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private regsterService: RegisterService, private route: Router) {}

  ngOnInit(): void {}

  Logout() {
    this.regsterService.Logout().subscribe(
      (res) => {
        this.route.navigate(['home']);
        localStorage.removeItem('email');
        localStorage.removeItem('expir');
        localStorage.removeItem('roleName');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isLogedIn() {
    const email = localStorage.getItem('email');
    const expir = localStorage.getItem('expir');
    const roleName = localStorage.getItem('roleName');

    if (email && expir && roleName) {
      return true;
    }
    return false;
  }
}
