import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, catchError, throwError } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/types/person';

@Component({
  selector: 'app-person-datails',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {
  form: FormGroup;
  id: any = null;
  title = "Cadastro de pessoa";
  model: Person = {
    name: "",
    lastName: ""
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
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
            console.error('Login error:', error);
            return throwError('Login failed');
          })).subscribe();
      }
      else {
        this.personService.newPerson(payload).pipe(map((response) => {
          this.router.navigate(["/"]);
        }),
          catchError((error) => {
            console.error('Login error:', error);
            return throwError('Login failed');
          })).subscribe();
      }
    }
  }

  getItem(): void {
    this.personService.getById(this.id).pipe(map((response) => {
      debugger
      if (response.success) {
        this.form.controls["name"].setValue(response.data.name);
        this.form.controls["lastName"].setValue(response.data.lastName);
        this.form.controls["nickname"].setValue(response.data.nickname);
      }
    }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError('Login failed');
      })).subscribe();
  }
}
