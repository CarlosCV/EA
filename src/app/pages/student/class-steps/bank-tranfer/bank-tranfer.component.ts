import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bank-tranfer',
  templateUrl: './bank-tranfer.component.html',
  styleUrls: ['./bank-tranfer.component.css']
})
export class BankTranferComponent implements OnInit {
  @Output() getnextStep = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  tabEvaluacion() {
    this.getnextStep.emit(true)
  }

}
