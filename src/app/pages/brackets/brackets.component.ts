import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, catchError } from 'rxjs';
import { BracketsService } from 'src/app/services/brackets.service';

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.scss']
})
export class BracketsComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private bracketsService: BracketsService) {
    this.form = formBuilder.group({
      text: ["", [Validators.required, Validators.pattern(/^[ \[\]{}()]*$/)]]
    })
  }

  validText() {
    debugger
    this.form.markAllAsTouched();

    if (this.form.valid)
      this.bracketsService.validText({ text: this.form.controls["text"].value }).pipe(map((response) => {
        debugger
        if (response.success) {}
      }),
        catchError((error) => {
          console.error('Error:', error);
          return error;
        })).subscribe();
  }
}
