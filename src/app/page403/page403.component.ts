import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-page403',
  templateUrl: './page403.component.html',
  styleUrls: ['./page403.component.css']
})
export class Page403Component implements OnInit {

  constructor(private service:AuthService) { }

  ngOnInit(): void {
    this.service.checkStorageEnc();
    console.log(this.service.roleName)
  }

}
