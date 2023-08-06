import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../components/modal-message/modal-message.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) { }

  openSuccessModal(message: string): NgbModalRef {
    const modalRef = this.modalService.open(ModalMessageComponent);
    modalRef.componentInstance.message = message || "Requisição processada com sucesso!";
    modalRef.componentInstance.type = "success";
    modalRef.componentInstance.title = "Obaa!";
    return modalRef;
  }

  openErrorModal(error: any): NgbModalRef {
    debugger
    const modalRef = this.modalService.open(ModalMessageComponent);
    modalRef.componentInstance.type = "error";
    modalRef.componentInstance.title = "Opss, algo deu errado...";
    modalRef.componentInstance.message = error;

    return modalRef;
  }

  openLoadingModal(message: string): NgbModalRef {
    const modalRef = this.modalService.open(ModalMessageComponent, { backdrop: 'static' });
    modalRef.componentInstance.message = message || "Estamos processando a requisição.";
    modalRef.componentInstance.type = "loading";
    modalRef.componentInstance.title = "Aguarde...";
    return modalRef;
  }
}
