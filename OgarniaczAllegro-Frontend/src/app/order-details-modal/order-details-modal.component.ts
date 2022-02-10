import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss']
})
export class OrderDetailsModalComponent implements OnInit {

  @Output() close = new EventEmitter<string>();

  constructor(
    // private modalService: NgbModal,

  ) {
  }

  ngOnInit(): void {
    // this.showModal()
    // this.gameService.showNextTurnModalE$.subscribe(v => {
    //   if (v) {
    //     this.showModal()
    //   } else {
    //     this.closeModal()
    //   }
    // });

    // this.gameService.currentEvent$.subscribe(e => this.currentEvent = e);
  }

  closeModal(result: string): void {
    this.close.emit('');
  }



  onKeyPressed(event: KeyboardEvent) {
    // if (
    //   !this.currentEvent.isRejectable
    //   || event.code === "Enter"
    //   || event.code === "Space"
    // ) {
    //   this.onDialogClose(DialogResultEnum.Accept);
    // }else{
    // // if (event.code === "Escape" && this.currentEvent.isRejectable) {
    // this.onDialogClose(DialogResultEnum.Reject);
    // }


    // this.closeModal();
  }

}
