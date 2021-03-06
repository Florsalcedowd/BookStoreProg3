import { UserInterface } from './../../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { BookInterface } from './../../../models/book';
import { DataApiService } from './../../../services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor( private dataApi: DataApiService, private authService: AuthService) { }

  public books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  actualPage = 1;

  /* Contiene el id del libro seleccionado en caso de actualización */
  public bookSelected: BookInterface = {
    id: null
  };

  ngOnInit() {
    this.getCurrentUser();
    this.getListBooks();
  }

  /* Busca si es usuario es admin a través del método isUserAdmin() de AuthService */
  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        });
      }
    });
  }

  /* Trae la lista de libros desde Firestore a través del método getAllBooks() del DataApiService */
  getListBooks() {
    this.dataApi.getAllBooks().subscribe( books => {
      this.books = books;
    });
  }

  getUserRegistres() {
    this.books = this.books.filter( book => book.userUid === this.userUid);
    this.actualPage = 1;
  }

  /* Elimina un libro a través del método deleteBook(id) del DataApiService */
  onDeleteBook(idBook: string) {
    const confirmacion = confirm('¿Estás seguro?');
    if (confirmacion) {
      this.dataApi.deleteBook(idBook);
    }
  }

  /* Trae el libro seleccionado del database*/
  onPreUpdateBook(book: BookInterface) {
    this.dataApi.selectedBook = Object.assign({}, book);
    this.bookSelected = this.dataApi.selectedBook;
  }

}
