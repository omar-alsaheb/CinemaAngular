import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/Models/actor';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  constructor(private service: AdminService,private router:Router) { }

  actorList: Actor[]
  ngOnInit(): void {
    this.getlist();
  }


  getlist() {
    this.service.GetAllActors().subscribe(r => {
      this.actorList = r;

    }, e => {
      console.log(e)
    })
  }
  deleteItem(id: number) {
    alert(id)
  }
  editActor(id:number){
    this.router.navigate(['edit-actor',id])
  }
}
