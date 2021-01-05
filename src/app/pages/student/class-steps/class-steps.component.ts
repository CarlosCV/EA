import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-class-steps',
  templateUrl: './class-steps.component.html',
  styleUrls: ['./class-steps.component.css']
})
export class ClassStepsComponent implements OnInit {
  isLinear = false;
  statusPayment = {
    paquete: true,
    paymentmethod: false,
    banktransfer: false
  }
  constructor(

  ) { }

  ngOnInit() {

  }
  paqueteSeleccionado(paquete) {
    this.statusPayment.paquete = false;
    this.statusPayment.paymentmethod = true;
  }
  paymentMethod(paymentTransfer) {
    this.statusPayment.paquete = false;
    this.statusPayment.paymentmethod = false;
    this.statusPayment.banktransfer = true
  }
  netStepValidate(value) {
    if (value) {
      document.getElementById("btnNextEvaluacion").click();
    }
  }



}
