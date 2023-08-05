import { Component } from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons"
import { Person } from 'src/app/types/person';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent {
  faPlus = faPlus;
  items: Array<Person>=[]

  constructor(){
    
  }
}
