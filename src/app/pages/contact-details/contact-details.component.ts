import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, catchError } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { ModalService } from 'src/app/services/modal.service';
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
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private modalService: ModalService
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
    var loading = this.modalService.openLoadingModal("");
    this.contactService.getById(this.id).pipe(map((response) => {
      setTimeout(() => loading.close(), 500)
      this.form.controls["value"].setValue(response.data.value);
      this.form.controls["type"].setValue(response.data.type);
      this.form.controls["isMain"].setValue(response.data.isMain);
    }),
      catchError((error) => {
        setTimeout(() => {
          loading.close()
          this.modalService.openErrorModal(error["error"]?.["errors"] || error["errors"]?.["Value"])
        }, 600);
        return error;
      })).subscribe();
  }


  save() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      var loading = this.modalService.openLoadingModal("");
      
      var payload: Contact = {
        value: this.form.controls["value"].value,
        isMain: this.form.controls["isMain"].value,
        type: this.form.controls["type"].value
      };

      if (this.id) {
        payload.id = this.id;

        this.contactService.updateContact(payload).pipe(map((response) => {
          setTimeout(() => {
            loading.close()
            this.modalService.openSuccessModal(response.message)
          }, 500);
          this.router.navigate(["/agenda/" + this.personId]);
        }),
          catchError((error) => {
            setTimeout(() => {
              loading.close()
              this.modalService.openErrorModal(error["error"]?.["errors"] || error["errors"]?.["Value"])
            }, 600);
            return error;
          })).subscribe();
      }
      else {
        this.contactService.createContact(payload, this.personId).pipe(map((response) => {
          setTimeout(() => {
            loading.close()
            this.modalService.openSuccessModal(response.message)
          }, 500);
          this.router.navigate(["/agenda/" + this.personId]);
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
  }
}
