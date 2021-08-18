import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { event } from 'jquery';
import * as $ from 'jquery';

import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private service: AdminService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }
  img: File;
  actorForms: FormGroup;
  url = "assets/img/deff.png"
  ngOnInit(): void {

    this.initActorForm();

  }

  HandleFiles(event: any) {

    if (event.target.files && event.target.files.length > 0) {
      this.img = event.target.files[0];
      var render = new FileReader();
      render.readAsDataURL(event.target.files[0]);
      render.onload = (event: any) => {
        this.url = event.target.result;
     }
    }
    else {
      this.url = "assets/img/deff.png"
    }

  }

  AddActor() {
    if (this.actorForms.valid) {

      const fd:FormData = new FormData();
      fd.append('image', this.img);
      fd.append('actorName', this.actorForms.value.actorName);
      // console.log(fd.append('image', this.img))
      this.service.AddActor(fd).subscribe(r=>{
        console.log(r)
      },e=>{
        console.log(e)
      })
      // console.log(this.actorForms.value)



    }
  }
  initActorForm() {
    this.actorForms = this.fb.group({
      actorName: ['', Validators.required],
      actorImage: [null]
    });

  }



}
