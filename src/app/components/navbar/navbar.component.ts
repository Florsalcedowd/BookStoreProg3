import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private AuthService: AuthService, private afsAuth: AngularFireAuth) { }

  public app_name: string = 'Book Store';
  public isLogged: boolean = false;

  ngOnInit() {
    this.getCurrentUser();
  }

  /* A través del método isAuth() de AuthService se averigua si hay un usuario loggeado o no */
  getCurrentUser() {
    this.AuthService.isAuth().subscribe( auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }

  /* Cierra la sesión del usuario */
  onLogout() {
    this.afsAuth.auth.signOut();
  }

}
