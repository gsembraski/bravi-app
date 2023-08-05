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
    var id = this.route.snapshot.paramMap.get('personId');

    if (!!id) this.title = "Editar Pessoa";
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.personService.newPerson({ name: this.form.controls["name"].value, lastName: this.form.controls["lastName"].value, nickname: this.form.controls["lastName"].value }).pipe(map((response) => {
        this.router.navigate(["/"]);
      }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError('Login failed');
        })).subscribe();
    }
  }
}
