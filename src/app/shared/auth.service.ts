import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor(private router:Router) {}
  // ici normalement on devrai prendre en parametre
  // un login et un mot de passe
  // et vérifier si le login et le mot de passe sont corrects
  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
    // on retourne à la page d'accueil
    this.router.navigate(['/home']);
  }

  // on suppose qu'on est admin si on est loggé
  // Elle doit renvoyer une promesse qui dit si on est loggué ou pas
  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
  }
}
