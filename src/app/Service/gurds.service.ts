import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GurdsService implements CanActivate,OnInit {

  constructor(private service:AuthService,private route:Router) { }
  ngOnInit(): void {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.service.checkStorageEnc();
    const email = !!localStorage.getItem('email')
    const role =!!localStorage.getItem('roleName')
    var roleName=this.service.roleName;
    if(role){
      if(roleName.toLowerCase() !== 'admin'){
        this.route.navigate(['page-access-denied']).then(x=>{window.location.reload()});
      }
      return true
    }
    else if(!email || !role){
      this.route.navigate(['page-not-found']).then(x=>{window.location.reload()});
    }
    return false;
  }




}
