import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}

  login() {
    this.authService.Login(this.loginForm.value).subscribe((response) => {
      if (response.token) {
        this.localStorage.set('token', response.token);
        this.router.navigate(['']);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
