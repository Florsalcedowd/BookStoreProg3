import { UserInterface } from './../models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  /* Registra un usario con email y contraseña */
  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then( userData => {
        resolve(userData);
        this.updateUserData(userData.user);
      }).catch(
        err => console.log(reject(err)));
    });
  }

  /* Login del usario con email y contraseña */
  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then( userData => resolve(userData),
        err => reject(err));
    });
  }

  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then( credential => this.updateUserData(credential.user));
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then( credential => this.updateUserData(credential.user));
  }

  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  /* Averigua si hay un usuario conectado o no */
  isAuth() {
    return this.afsAuth.authState.pipe(map( auth => auth));
  }

  /* Le asigna el rol de editor al usuario y hace un merge con el registro de la base de datos*/
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        editor: true
      }
    };

    return userRef.set(data, { merge: true});
  }

  /* Permite saber si el usario es admin */
  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }


}
