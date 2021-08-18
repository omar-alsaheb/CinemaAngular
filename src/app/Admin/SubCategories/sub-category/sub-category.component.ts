import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/Models/CategoryModel';
import { SubCategory } from 'src/app/Models/SubCategoryModel';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  constructor(private fb: FormBuilder, private admin: AdminService, private activeRoute: ActivatedRoute) { }
  subCat: SubCategory;
  addNewSubCatForm: FormGroup;
  mainCat: Category[];
  id: number;
  isUpdateMode: boolean;
  title1: string;
  buttonTitle: string;
  subCatId: number;
  ngOnInit(): void {

    this.init();
    this.initFormValue();
    this.activatedRoute();
    console.log(this.subCatId)
    // this.mainCat=[];


  }

  init() {
    this.isUpdateMode = false;
    this.title1 = "Add New SubCat";
    this.buttonTitle = "Add New Sub"
    this.admin.getAllcategories().subscribe(r => {
      // console.log(r)
      this.mainCat = r;
    }, e => {
      console.log(e)
    })

    this.addNewSubCatForm = this.fb.group({
      subCategoryName: ['', Validators.required],
      categoryId: [0, Validators.required]

    });
    this.subCat = {
      id: 0,
      subCategoryName: '',
      categoryId: 0,
      category: {
        id: 0,
        categoryName: ''
      }


    };



  }

  onSubmit() {
    let subCatName = this.addNewSubCatForm.value.subCategoryName;
    let catId = +this.addNewSubCatForm.value.categoryId;
    //for init value and make sure of validate

    if (this.isUpdateMode == false) {
      if (subCatName !== null && subCatName !== '' && subCatName !== "" && catId && catId > 0) {
        // console.log(this.addNewSubCatForm.value)
        // console.log(typeof (catId));
        this.initFormValue();
        this.admin.AddSubCategory(this.subCat).subscribe(r => {
          console.log(r)
        }, e => {
          console.log(e)
        })
      }
    }
    if (this.isUpdateMode) {
      this.subCat.id = this.subCatId;
      this.subCat.subCategoryName = subCatName;
      this.subCat.categoryId = catId;

      this.admin.EditSubCategory(this.subCat).subscribe(r => {
        console.log(r)

      }, e => {
        console.log(e)
      })
    }
  }
  initFormValue() {
    let catId = +this.addNewSubCatForm.value.categoryId;
    let name = this.addNewSubCatForm.value.subCategoryName;
    this.subCat.id = 0;
    this.subCat.categoryId = catId
    this.subCat.subCategoryName = name
    this.subCat.category.id = catId;
    this.subCat.category.categoryName = 'Hello';
  }

  activatedRoute() {
    this.activeRoute.paramMap.subscribe(param => {

      this.subCatId = +this.activeRoute.snapshot.params['id'];
      let subCatName = this.activeRoute.snapshot.params['name'];
      let catId = +this.activeRoute.snapshot.params['id1'];

      if (this.subCatId && subCatName && catId) {
        this.isUpdateMode = true;
        this.title1 = "Update Sub Cat";
        this.buttonTitle = "Update"
        this.addNewSubCatForm.patchValue({
          subCategoryName: subCatName,
          categoryId: catId
        })
        //Use the patchValue() method to replace any properties defined in the object that have changed in the form model.

      }

    }, e => {

    })
  }
}
