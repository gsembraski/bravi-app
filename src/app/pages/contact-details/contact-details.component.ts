import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, catchError } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/types/contact';

@Component({
  selector: 'app-contact-datails',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  title = "Cadastrar contato";
  form: FormGroup;
  id: any = null;
  personId: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      value: ['', Validators.required],
      type: [1, Validators.required],
      isMain: [false]
    })
  }

  ngOnInit(): void {
    this.personId = Number(this.route.snapshot.paramMap.get('personId'));
    var id = this.route.snapshot.paramMap.get('contactId');
    if (!!id) {
      this.id = Number(id);
      this.title = "Editar contato";
      this.getItem();
    }
  }

  getItem(): void {
    this.contactService.getById(this.id).pipe(map((response) => {
      debugger
      if (response.success) {
        this.form.controls["value"].setValue(response.data.value);
        this.form.controls["type"].setValue(response.data.type);
        this.form.controls["isMain"].setValue(response.data.isMain);
      }
    }),
      catchError((error) => {
        console.error('Login error:', error);
        return error;
      })).subscribe();
  }


  save() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      var payload: Contact = {
        value: this.form.controls["value"].value,
        isMain: this.form.controls["isMain"].value,
        type: this.form.controls["type"].value
      };

      if (this.id) {
        payload.id = this.id;

        this.contactService.updateContact(payload).pipe(map((response) => {
          this.router.navigate(["/agenda/" + this.personId]);
        }),
          catchError((error) => {
            console.error('Login error:', error);
            return error;
          })).subscribe();
      }
      else {
        this.contactService.createContact(payload, this.personId).pipe(map((response) => {
          this.router.navigate(["/agenda/" + this.personId]);
        }),
          catchError((error) => {
            console.error('Login error:', error);
            return error;
          })).subscribe();
      }
    }
  }
}
