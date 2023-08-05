import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiRoute = `${environment.apiUrl}/person`

  constructor(private http: HttpClient) { }
  
  getAgenda() : Observable<any> {
    return this.http.get<any>(`${this.apiRoute}`);
  }
}