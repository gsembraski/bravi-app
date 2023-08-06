import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTriangleExclamation, faCircleCheck } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})

export class ModalMessageComponent {
  @Input() message: string = "";
  @Input() type: string = "";
  @Input() title: string = "";

  constructor(public activeModal: NgbActiveModal) { }

  getIcon() {
    if (this.type == "success") return faCircleCheck;
    else  return faTriangleExclamation;
  }
}