import { IOrder, Order } from './../models/order';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'tr[app-order-row]',
  templateUrl: './order-row.component.html',
  styleUrls: ['./order-row.component.scss']
})
export class OrderRowComponent implements OnInit {
  @Input() order: IOrder = new Order();
  @Input() isInEdit = false;


  @Output() editComplete = new EventEmitter<IOrder>();
  // editedField = '';

  constructor() { }

  ngOnInit(): void { }

  addNew() {
    this.editComplete.emit(this.order);
  }

  // onEdit(fieldName: string) {
  //   // this.editedField = fieldName;// || this.order.id === 0; // !== this.editedField ? fieldName : '';
  // }

  // isEdited(fieldName: string) {
  //   // return (this.editedField === fieldName);// || (this.order.id === 0); // !== this.editedField ? fieldName : '';
  //   return false;
  // }

}
