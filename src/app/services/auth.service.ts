import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  public jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public Login(userlogin: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.baseUrl + '/login', JSON.stringify(userlogin), {
      headers,
    });
  }

  public IsLoggedIn(): boolean {
    const token = this.localStorageService.get('token');
    if (token) return !this.jwtHelper.isTokenExpired(token);
    else return false;
  }
}
