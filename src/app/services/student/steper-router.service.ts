import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable()
export class SteperRouterService {
  @Output() NextStepClick: EventEmitter<string> = new EventEmitter();
  NextStep(value) {
    this.NextStepClick.emit(value);
  }

}