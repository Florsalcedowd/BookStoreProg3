import { BookInterface } from './../../models/book';
import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }

  public book: BookInterface = {
    autor: '',
    descripcion: '',
    idioma: '',
    link_amazon: '',
    oferta: '',
    portada: '',
    precio: '',
    titulo: ''
  };

  ngOnInit() {
    const idBook = this.route.snapshot.params.id;
    this.getDetails(idBook);
  }

  getDetails(idBook: string): void {
    this.dataApi.getOneBook(idBook).subscribe( book => {
      this.book = book;
    });
  }

}
