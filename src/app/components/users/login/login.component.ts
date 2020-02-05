import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }

  public email: string = '';
  public password: string = '';

  isError = false;
  msgError = null;

  ngOnInit() {
  }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
    .then((res) => {
      this.onLoginRedirect();
      this.isError = false;
    }).catch( err => {
      this.isError = true;
      this.msgError = err.message;
    });
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
    .then((res) => {
      this.onLoginRedirect();
      this.isError = false;
    }).catch ( err => {
      this.isError = true;
      this.msgError = err.message;
    });
  }

  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then( (res) => {
        this.onLoginRedirect();
        this.isError = false;
      }).catch( err => {
        this.isError = true;
        this.msgError = err.message;
      });
  }

  onLogout() {
    this.authService.logoutUser();
  }

  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }

  onCloseAlert() {
    this.isError = false;
    this.msgError = null;
  }

}
