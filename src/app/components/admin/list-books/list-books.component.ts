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

  ngOnInit() {
    this.getCurrentUser();
    this.getListBooks();
  }

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

  getListBooks() {
    this.dataApi.getAllBooks().subscribe( books => {
      this.books = books;
    });
  }

  onDeleteBook(idBook: string) {
    const confirmacion = confirm('¿Estás seguro?');
    if (confirmacion) {
      this.dataApi.deleteBook(idBook);
    }
  }

  onPreUpdateBook(book: BookInterface) {
    console.log(book);
    this.dataApi.selectedBook = Object.assign({}, book);
  }

}
