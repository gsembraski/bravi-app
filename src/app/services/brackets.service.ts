import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Bracket } from '../types/bracket';

@Injectable({
  providedIn: 'root'
})
export class BracketsService {
  private apiRoute = `${environment.apiUrl}/bracket`

  constructor(private http: HttpClient) { }

  validText(payload: Bracket): Observable<any> {
    return this.http.post(`${this.apiRoute}`, payload);
  }
}
