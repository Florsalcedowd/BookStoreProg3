import { Component, OnInit } from '@angular/core';
import { BookInterface } from 'src/app/models/book';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  public books: BookInterface[];

  ngOnInit() {
    this.getOffers();
  }

  /* Obtiene los libros en oferta con el método getAllBooksOffers() del DataApiService */
  getOffers() {
    this.dataApi.getAllBooksOffers().subscribe(offers => this.books = offers);
  }

}
