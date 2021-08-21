import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movieModel';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  constructor(private service: AdminService) { }
movieList:Movie[];

  ngOnInit(): void {
    this.getMovie();
  }


  getMovie() {
    this.service.GetMovies().subscribe(r => {
      console.log(r)
      this.movieList=r;
    }, e => {
      console.log(e)

    })
  }
}
