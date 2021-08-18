import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/Models/CategoryModel';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: AdminService, private activeRoute: ActivatedRoute) { }

  addNewCategoryForm: FormGroup;
  category: Category;
  categoryTitle: string
  isUpdateMode: boolean;
  id: number;


  ngOnInit(): void {
    this.initCategoryForm();
    this.initStrings();
    this.activeRouteFunc();
  }

  initStrings() {
    this.categoryTitle = 'Add new';
    this.isUpdateMode = false;
    this.id = 0;

  }

  initCategoryForm() {
    this.addNewCategoryForm = this.fb.group({
      categoryName: ['', [Validators.required, Validators.maxLength(150)]]
    });

    this.category = {
      id: 0,
      categoryName: ''
    }
  }

  onSubmit() {
    // console.log(this.isUpdateMode)
    var catName = this.addNewCategoryForm.value.categoryName
    if (this.isUpdateMode) {
      this.category.id = this.id;
      this.category.categoryName = catName;
      this.service.UpdateCategory(this.category).subscribe(re => {
        console.log(re)
      }, er => {
        console.log(er)
      })
    }
    if (!this.isUpdateMode) {

      if (catName) {
        console.log(this.addNewCategoryForm.value.categoryName)
        this.initFormValue();
        this.service.AddNewCategory(this.category).subscribe(re => {
          console.log(re)
          this.addNewCategoryForm.reset();
        }, er => {
          console.log(er)
        })
      }

    }
  }


  initFormValue() {
    this.category.id = 0;
    this.category.categoryName = this.addNewCategoryForm.value.categoryName;
  }


  activeRouteFunc() {
    this.activeRoute.paramMap.subscribe(param => {

      // this.id = +param.get('id');
       this.id = +this.activeRoute.snapshot.params['id']; // i use this cuz my param is number not string
      // console.log(this.id)
      let catName = param.get('id1');

      if (this.id && catName) {
        this.categoryTitle = 'Update Category';
        this.isUpdateMode = true;
        this.addNewCategoryForm.patchValue({
          categoryName: catName
        });
                //Use the patchValue() method to replace any properties defined in the object that have changed in the form model.

      }

    }, error => {
      alert("asdsad")
    })
  }


}
