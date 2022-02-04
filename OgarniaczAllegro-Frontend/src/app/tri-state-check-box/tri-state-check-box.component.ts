import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const STATES: (boolean | undefined)[] = [
  true,
  false,
  undefined,
]

@Component({
  selector: 'app-tri-state-check-box',
  templateUrl: './tri-state-check-box.component.html',
  styleUrls: ['./tri-state-check-box.component.scss']
})
export class TriStateCheckBoxComponent implements OnInit {
  @Input() value?: boolean | undefined = undefined;
  @Output() valueChange = new EventEmitter<boolean | undefined>();

  states = STATES;


  // @Input() inputModel: string;
  // @Output() inputModelChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleState() {
    let nextStateIdx = this.states.findIndex(s => this.value === s) + 1;
    nextStateIdx = nextStateIdx >= this.states.length ? 0 : nextStateIdx;
    this.value = this.states[nextStateIdx];
    this.valueChange.emit(this.value);
  }
}
