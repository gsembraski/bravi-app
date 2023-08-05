import { Component, OnInit } from '@angular/core';
import {faPlus, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons"
import { map, catchError, throwError } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/types/person';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  faPlus = faPlus;
  faEllipsisVertical = faEllipsisVertical;
  items: Array<Person>=[]

  constructor(private personService : PersonService){}

  ngOnInit(): void {
    this.personService.getAgenda().pipe(map((response) => {
      this.items = response.data;
    }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError('Login failed');
      })).subscribe();
  }
}
