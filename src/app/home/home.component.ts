import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.service.checkStorageEnc();
    console.log("ssss "+this.service.roleName);
  }

}
