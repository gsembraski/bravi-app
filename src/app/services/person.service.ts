import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment';
import { Observable } from 'rxjs';
import { Person } from '../types/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiRoute = `${environment.apiUrl}/person`

  constructor(private http: HttpClient) { }

  getAgenda(): Observable<any> {
    return this.http.get<any>(`${this.apiRoute}`);
  }

  newPerson(payload: Person): Observable<any> {
    return this.http.post(`${this.apiRoute}`, payload);
  }
}