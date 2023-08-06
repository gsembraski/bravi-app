import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, catchError, timeout } from 'rxjs';
import { BracketsService } from 'src/app/services/brackets.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.scss']
})
export class BracketsComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private bracketsService: BracketsService,
    private modalService: ModalService) {
    this.form = this.formBuilder.group({
      text: ["", [Validators.required, Validators.pattern(/^[ \[\]{}()]*$/)]]
    })
  }

  validText() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      var loading = this.modalService.openLoadingModal("");
      this.bracketsService.validText({ text: this.form.controls["text"].value }).pipe(map((response) => {
        setTimeout(() => {
          loading.close();
          this.modalService.openSuccessModal(response.message)
        }, 500);
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
