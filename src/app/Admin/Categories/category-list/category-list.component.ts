import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/CategoryModel';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private service: AdminService, private route: Router) { }

  categories: Category[];

  ngOnInit(): void {
    this.getcategories();

  }



  getcategories() {
    this.service.getAllcategories().subscribe(re => {
      this.categories = re;
      console.log(this.categories)
    }, e => {
      console.log(e)
    })
  }

  EditCategory(id: number, categoryName: string) {
    this.route.navigate(['editcategory', id, categoryName]);
  }
  AddCategory() {
    this.route.navigate(['add-category']);
  }

  DeleteCategory(id: number) {
    if (confirm("R U sure?")) {
      this.service.DeleteCategory(id).subscribe(re => {
        this.route.navigate(['admin/dashboard']).then(x => window.location.reload())
      }, e => {
        console.log("Id not Found")
      })
    }
  }
}
