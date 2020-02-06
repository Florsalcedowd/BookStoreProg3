import { NgForm } from '@angular/forms';
import { BookInterface } from './../../models/book';
import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  /* Permite comunicar componentes, crea una referencia hacia el evento (click) que se encuentra en el btnClose del html */
  @ViewChild('btnClose',  { static: true }) btnClose: ElementRef;

  /* Recibe el userUid que viene desde list-books */
  @Input() userUid: string;

  /* Recibe el bookSelected que viene desde list-book */
  @Input() bookSelected: BookInterface;

  ngOnInit() {
  }

  onSaveBook(bookForm: NgForm): void {
    if (bookForm.value.id == null) {
      // Nuevo libro
      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);
    } else {
      // Actualización
      this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();
    /* Cierra la ventana modal */
    this.btnClose.nativeElement.click();
  }

}
