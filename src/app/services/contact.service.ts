import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Contact } from '../types/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiRoute = `${environment.apiUrl}/contact`

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiRoute}/${id}`);
  }

  createContact(payload: Contact, personId:number): Observable<any> {
    return this.http.post(`${this.apiRoute}/${personId}`, payload);
  }

  updateContact(payload: Contact): Observable<any> {
    return this.http.put(`${this.apiRoute}/${payload.id}`, payload);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiRoute}/${id}`);
  }
}
