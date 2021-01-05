import { Injectable, Output, EventEmitter } from '@angular/core'
@Injectable()
export class TranslateLabelService {
  @Output() change: EventEmitter<string> = new EventEmitter();
  @Output() changeExpanded: EventEmitter<boolean> = new EventEmitter();
  @Output() changeSiderbar: EventEmitter<boolean> = new EventEmitter();
  ChangeLanguaje(languaje) {
    this.change.emit(languaje);
  }

  eventExpanded(value) {
    this.changeExpanded.emit(value)
  }
  eventSiderbarView(value) {
    this.changeSiderbar.emit(value)
  }

}