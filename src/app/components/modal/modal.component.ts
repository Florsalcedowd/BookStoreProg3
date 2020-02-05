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

  @ViewChild('btnClose',  { static: true }) btnClose: ElementRef;
  @Input() userUid: string;


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
    this.btnClose.nativeElement.click();
  }

}
