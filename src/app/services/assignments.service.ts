import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  baseUrl = environment.apiUrl;
  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) {}

  public GetAssignments(userlogin: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.baseUrl + 'login', JSON.stringify(userlogin), {
      headers,
    });
  }
}
