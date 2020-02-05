import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  public books = [];
  public book = '';

  /* Al iniciar el componente trae la lista de libros a través del método getAllBooks() del DataApiService */
  ngOnInit() {
    this.dataApi.getAllBooks().subscribe( books => {
      this.books = books;
    });
  }

}
