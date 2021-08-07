import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { CryptService } from '../Service/crypt.service';
import { RegisterService } from '../Service/register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private regsterService: RegisterService,
    private route: Router,
    private auth: AuthService,
    private crypto: CryptService,
    private cdr: ChangeDetectorRef
  ) {}

  roleName: string;
  isAdmins: boolean = false;
  ngOnInit(): void {}

  Logout() {
    this.regsterService.Logout().subscribe(
      (res) => {
        this.route.navigate(['home']);
        localStorage.removeItem('email');
        localStorage.removeItem('expir');
        localStorage.removeItem('roleName');
        window.location.reload();
        this.route.navigate(['home'])
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
      this.roleName = this.crypto.Decrypt(localStorage.getItem('roleName'));

      return true;
    }
    return false;
  }

  isAdmin() {
    if (this.roleName == 'Admin') {
      return (this.isAdmins = true);
    }
    return (this.isAdmins = false);
  }

  ngAfterViewInit() {
    this.isAdmins = false;
  }
  ngAfterContentChecked() {
    this.cdr.detectChanges();
    // call or add here your code
  }
}
