import { TriStateStatusEnum } from '../../models/constants/status.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tri-state-check-box',
  templateUrl: './tri-state-check-box.component.html',
  styleUrls: ['./tri-state-check-box.component.scss']
})
export class TriStateCheckBoxComponent implements OnInit {
  @Input() value = TriStateStatusEnum.UNKNOWN;
  @Input() numOfStates = 4;
  @Output() valueChange = new EventEmitter<TriStateStatusEnum>();
  @Input() disabled = false;
  @Input() hidden = false;

  statuses = TriStateStatusEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleState() {
    switch (this.numOfStates) {
      case 2:
        this.toggleTwoStates();
        break;

      case 3:
        this.toggleThreeStates();
        break;

      case 4:
        this.toggleFourStates();
        break;

      default:
        break;
    }

  }
  private toggleTwoStates() {
    this.valueChange.emit(this.value === TriStateStatusEnum.YES ? TriStateStatusEnum.NO : TriStateStatusEnum.YES);
  }

  private toggleThreeStates() {
    const statuses = Object.values(TriStateStatusEnum).filter(s => s !== TriStateStatusEnum.UNKNOWN);
    let nextStatusIdx = statuses.findIndex(s => this.value === s) + 1;
    nextStatusIdx = nextStatusIdx >= statuses.length ? 0 : nextStatusIdx;
    this.value = statuses[nextStatusIdx];
    this.valueChange.emit(this.value);
  }

  private toggleFourStates() {
    const statuses = Object.values(TriStateStatusEnum);
    let nextStatusIdx = statuses.findIndex(s => this.value === s) + 1;
    nextStatusIdx = nextStatusIdx >= statuses.length ? 0 : nextStatusIdx;
    this.value = statuses[nextStatusIdx];
    this.valueChange.emit(this.value);
  }

}
