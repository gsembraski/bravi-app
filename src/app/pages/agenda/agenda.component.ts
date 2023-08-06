import { Component, OnInit } from '@angular/core';
import {faPlus, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons"
import { map, catchError, throwError } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
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

  constructor(private personService : PersonService,
    private modalService: ModalService){}

  ngOnInit(): void {
    this.getAgenda();
  }

  getAgenda(){
    this.personService.getAgenda().pipe(map((response) => {
      this.items = response.data;
    }),
      catchError((error) => {
        console.error('Error:', error);
        return throwError('Login failed');
      })).subscribe();
  }

  remove(id: any): void {
    var loading = this.modalService.openLoadingModal("");
    this.personService.deletePerson(id).pipe(map((response) => {
      if (response.success) {
        setTimeout(() => {
          loading.close()
          this.modalService.openSuccessModal(response.message)
        }, 600);
        this.getAgenda();
      }
    }),
      catchError((error) => {
        setTimeout(() => {
          loading.close()
          this.modalService.openErrorModal(error["error"]?.["errors"] || error["errors"]?.["Value"])
        }, 600);
        return error;
      })).subscribe();
  }
}
