import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, catchError, throwError } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/types/person';
import { faEllipsisVertical, faCircleCheck, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Contact } from 'src/app/types/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-person-datails',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {
  faPlus = faPlus;
  faEllipsisVertical = faEllipsisVertical;
  faCircleCheck = faCircleCheck;
  form: FormGroup;
  id: any = null;
  title = "Cadastro de pessoa";
  phones: Array<Contact> = [];
  emails: Array<Contact> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      nickname: ['']
    })
  }

  ngOnInit(): void {
    var personId = this.route.snapshot.paramMap.get('personId');

    if (!!personId) {
      this.id = Number(personId);
      this.title = "Editar Pessoa";
      this.getItem();
    }
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      var payload: Person = {
        name: this.form.controls["name"].value,
        lastName: this.form.controls["lastName"].value,
        nickname: this.form.controls["nickname"].value
      };

      if (this.id) {
        payload.id = this.id;

        this.personService.updatePerson(payload).pipe(map((response) => {
          this.router.navigate(["/"]);
        }),
          catchError((error) => {
            console.error('Error:', error);
            return error;
          })).subscribe();
      }
      else {
        this.personService.newPerson(payload).pipe(map((response) => {
          this.router.navigate(["/agenda/" + response.data]);
        }),
          catchError((error) => {
            console.error('Error:', error);
            return error;
          })).subscribe();
      }
    }
  }

  getItem(): void {
    this.personService.getById(this.id).pipe(map((response) => {
      if (response.success) {
        this.form.controls["name"].setValue(response.data.name);
        this.form.controls["lastName"].setValue(response.data.lastName);
        this.form.controls["nickname"].setValue(response.data.nickname);

        this.phones = response.data.phoneContacts;
        this.emails = response.data.emailContacts;
      }
    }),
      catchError((error) => {
        console.error('Error:', error);
        return error;
      })).subscribe();
  }

  remove(id: any): void {
    this.contactService.deleteContact(id).pipe(map((response) => {
      if (response.success) {
        this.getItem();
      }
    }),
      catchError((error) => {
        console.error('Error:', error);
        return error;
      })).subscribe();
  }
}
