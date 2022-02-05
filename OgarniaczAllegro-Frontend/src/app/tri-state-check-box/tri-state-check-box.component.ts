import { StatusEnum } from '../models/status.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tri-state-check-box',
  templateUrl: './tri-state-check-box.component.html',
  styleUrls: ['./tri-state-check-box.component.scss']
})
export class TriStateCheckBoxComponent implements OnInit {
  @Input() value?: StatusEnum = StatusEnum.Unknown;
  @Output() valueChange = new EventEmitter<StatusEnum>();
  @Input() disabled = false;
  @Input() hidden = false;

  statuses = StatusEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleState() {
    let statuses = Object.values(StatusEnum);
    let nextStatusIdx = statuses.findIndex(s => this.value === s) + 1;
    nextStatusIdx = nextStatusIdx >= statuses.length ? 0 : nextStatusIdx;
    this.value = statuses[nextStatusIdx];
    this.valueChange.emit(this.value);
  }
}
