import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) { }

  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;

  public email: string = '';
  public password: string = '';

  public msgError = null;
  public isError = false;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }

  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  onAddUser() {
    this.authService.registerUser(this.email, this.password)
    .then((res) => {
      this.authService.isAuth().subscribe( user => {
        if (user) {
          console.log('userActual', user);
          user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value
          }).then( () => {
            this.router.navigate(['admin/list-books']);
          }).catch((error) => { console.log('error', error); });
        }
      });
    }).catch(err => {
      this.isError = true;
      this.msgError = err.message;
    });
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => {
      this.isError = true;
      this.msgError = err.message;
    });;
  }

  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then( (res) => {
        this.onLoginRedirect();
      }).catch(err => {
        this.isError = true;
        this.msgError = err.message;
      });
  }

  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }

  onCloseAlert() {
    this.isError = false;
    this.msgError = null;
  }

}
