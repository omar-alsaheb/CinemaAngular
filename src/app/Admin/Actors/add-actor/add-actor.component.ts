import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { event } from 'jquery';
import * as $ from 'jquery';

import { AdminService } from 'src/app/Service/admin.service';
import { Actor } from 'src/app/Models/actor';

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
  id: number;
  imgPath = "https://localhost:44378/images/actors/"

  ngOnInit(): void {

    this.initActorForm();
    this.activeRoute();
  }

  HandleFiles(event: any) {

    if (event.target.files && event.target.files.length > 0) {
      this.img = event.target.files[0];
      var render = new FileReader();
      render.readAsDataURL(event.target.files[0]);
      render.onload = (event: any) => {
        this.url = event.target.result;
        console.log(event.target.fileName)
      }
    }
    else {
      this.url = "assets/img/deff.png"
    }

  }

  AddActor() {
    if (this.actorForms.valid) {

      const fd: FormData = new FormData();
      fd.append('image', this.img);
      fd.append('actorName', this.actorForms.value.actorName);


      if (!this.id) {

        this.service.AddActor(fd).subscribe(r => {
          console.log(r)
          this.actorForms.reset();
        }, e => {
          console.log(e)
        })
      }
      else if (this.id) {
        fd.append('id', this.id.toString());
        console.log(this.id)
        // console.log(fd.append('id', this.id.toString()))
        this.service.EditActor(fd).subscribe(r => {
          console.log(r)


      }, e => {
        console.log(e)
      })

    }

    // console.log(fd.append('image', this.img))

    // console.log(this.actorForms.value)



  }
}
initActorForm() {
  this.actorForms = this.fb.group({
    actorName: ['', Validators.required],
    actorImage: [null]
  });

}

activeRoute() {
  this.activateRoute.paramMap.subscribe(r => {
    this.id = +this.activateRoute.snapshot.params['id'];
    // console.log(this.id)
    if (this.id) {
      this.service.GetActor(this.id).subscribe(r => {

        console.log(r)
        this.actorForms.patchValue({
          actorName: r.actorName
        })
        this.url = this.imgPath + r.actorPicture
      }, e => {
        console.log(e)
      })
    }

  }, e => {
    console.log(e)
  })
}




}
