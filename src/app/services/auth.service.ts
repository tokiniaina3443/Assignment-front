import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public Login(userlogin: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.baseUrl + 'login', JSON.stringify(userlogin), {
      headers,
    });
  }
}
