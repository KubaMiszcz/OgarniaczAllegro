import { TriStateStatusEnum } from '../../models/constants/status.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tri-state-check-box',
  templateUrl: './tri-state-check-box.component.html',
  styleUrls: ['./tri-state-check-box.component.scss']
})
export class TriStateCheckBoxComponent implements OnInit {
  @Input() value?: TriStateStatusEnum = TriStateStatusEnum.UNKNOWN;
  @Output() valueChange = new EventEmitter<TriStateStatusEnum>();
  @Input() disabled = false;
  @Input() hidden = false;

  statuses = TriStateStatusEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleState() {
    const statuses = Object.values(TriStateStatusEnum);
    let nextStatusIdx = statuses.findIndex(s => this.value === s) + 1;
    nextStatusIdx = nextStatusIdx >= statuses.length ? 0 : nextStatusIdx;
    this.value = statuses[nextStatusIdx];
    this.valueChange.emit(this.value);
  }
}
