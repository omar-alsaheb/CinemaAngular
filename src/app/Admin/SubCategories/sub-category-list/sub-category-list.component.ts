import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategory } from 'src/app/Models/SubCategoryModel';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})
export class SubCategoryListComponent implements OnInit {

  constructor(private router: Router, private admin: AdminService) { }
  subCategory: SubCategory[]

  ngOnInit(): void {
    this.SubCategoryList();
  }


  SubCategoryList() {
    this.admin.GetSubCategory().subscribe(r => {
      // console.log(r)
      this.subCategory = r;
    }, e => {
      console.log(e)
    })
  }

  DeleteSubCat(id: number) {
    if (confirm('Arue u sure ?')) {
      this.admin.DeleteSubCategory(id).subscribe(r => {

        this.SubCategoryList();
      }, e => {
        console.log(e)
      })
    }
  }

  goToAdd() {
    this.router.navigate(['add-subCategory'])
  }

  EditSubCat(id: number, name: string, id1: number) {
    if (id) {
      this.router.navigate(['edit-sub-cat', id, name, id1])
    }
  }
}
