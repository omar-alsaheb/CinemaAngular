import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/Models/actor';
import { SubCategory } from 'src/app/Models/SubCategoryModel';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private service: AdminService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }
  img: File;
  movieForms: FormGroup;
  url = "assets/img/deff.png"
  id: number;
  imgPath = "https://localhost:44378/images/actors/"
  subCat: SubCategory[];
  actors: Actor[];
  actorList: number[];

  ngOnInit(): void {

    this.initMovieForm();
    this.activeRoute();
    this.getSubCAt();
    this.getActor();
    this.actorList = [];
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

  AddMovie() {
    console.log(this.movieForms.value)
    if (this.movieForms.valid) {

      const fd: FormData = new FormData();
      fd.append('image', this.img);
      fd.append('actorName', this.movieForms.value.actorName);


      if (!this.id) {

        // this.service.AddActor(fd).subscribe(r => {
        //   console.log(r)
        //   this.movieForms.reset();
        // }, e => {
        //   console.log(e)
        // })
      }
      else if (this.id) {
        // fd.append('id', this.id.toString());
        // console.log(this.id)
        // this.service.EditActor(fd).subscribe(r => {
        //   console.log(r)


        // }, e => {
        //   console.log(e)
        // })

      }


    }
  }
  initMovieForm() {
    this.movieForms = this.fb.group({
      movieName: ['', Validators.required],
      movieStory: ['', Validators.required],
      movieTrailer: ['', Validators.required],
      actId: [0, Validators.required],
      subCatId: [0, Validators.required],

      actorImage: [null],
      actorControl: this.fb.array([
        this.myActorGroup(0, '')
      ])

    });

  }

  get actorControl() {
    return this.movieForms.get('actorControl') as FormArray
  }
  myActorGroup(id: number, name: string): FormGroup {
    return this.fb.group({
      actId: id,
      actName: name
    })
  }

  activeRoute() {
    this.activateRoute.paramMap.subscribe(r => {
      this.id = +this.activateRoute.snapshot.params['id'];
      if (this.id) {
        this.service.GetActor(this.id).subscribe(r => {

          console.log(r)
          this.movieForms.patchValue({
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


  getSubCAt() {
    this.service.GetSubCategory().subscribe(r => {
      this.subCat = r;

    }, e => {
      console.log(e)
    })
  }

  getActor() {
    this.service.GetAllActors().subscribe(r => {
      this.actors = r;

    }, e => {
      console.log(e)
    })
  }

  actorOnChange() {
    const id = this.movieForms.value.actId;
    var txt = $("#actor-selc option:selected").text();


    if (id > 0 && txt) {
      for (let index = 0; index < this.actorList.length; index++) {
        const element = this.actorList[index];

        if (element === id) {
          alert("Actor is exeist")
          return;
        }

      }

    }
    this.actorList.push(id)
    console.log(this.actorList);
    (<FormArray>this.movieForms.get('actorControl')).push(this.myActorGroup(id, txt));

  }


  removeActor(frmGr: number) {
    var actor = this.movieForms.get(['actorControl', frmGr]).value;
    var actorId = actor.actId;

    for (let index = 0; index < this.actorList.length; index++) {
      var element = this.actorList[index];

      if (element === actorId) {
        this.actorList.splice(index, 1)
      }

    }
    console.log(this.actorList)

  }


}
