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

  /* Inicio de sesión con correo y contraseña */
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

  /* Inicio de sesión con google */
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

  /* Inicio de sesión con facebook */
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

  /* Cierra la sesión */
  onLogout() {
    this.authService.logoutUser();
  }

  /* Redirecciona al usuario a la lista de libros */
  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }

  /* Reinicia los valores al cerrarte el alerta de errores */
  onCloseAlert() {
    this.isError = false;
    this.msgError = null;
  }

}
