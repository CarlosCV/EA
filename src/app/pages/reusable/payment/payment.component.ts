import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment/payment.service'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService) { }

  async ngOnInit() {

  }

  async CreatePayent() {
    /* this.paymentService.createPayment().then(data =>{
      sessionStorage.setItem("token_",data.objetoRespuesta.tokenPayment )
      window.location.href= data.objetoRespuesta.urlPaypal;
    }); */
     
   /*  window.open(
      array.objetoRespuesta.urlPaypal,
      '_blank'
    ); */
  }

}
