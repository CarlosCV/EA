import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  @Output() getPaymentMethod = new EventEmitter<any>();
  model = {
    methodpay: "paypal"
  }
  constructor() { }

  ngOnInit(): void {
  }
  pagar() {
    if (this.model.methodpay === "paypal") {
      alert("pagara por paypal")
    } else if (this.model.methodpay === "transferencia") {
      this.getPaymentMethod.emit(this.model.methodpay)
    }


  }

}
