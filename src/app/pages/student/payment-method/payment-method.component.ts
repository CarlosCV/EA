import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../../services/payment/payment.service'
@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  jsonData: string
  model = {
    methodpay: "paypal"
  }
  paquete = {
    PackageId: "",
    total: ""
  }
  paquetePay = {
    packageId: "",
    idUser: "",
    method: "paypal",
    intent: "SALE",
    description: "test"
  }
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService
  ) { }
  ngOnInit() {
    this.jsonData = this.activatedRoute.snapshot.paramMap.get("p");
    let dataParam = JSON.parse(atob(this.jsonData))
    this.paquete = {
      PackageId: dataParam.id,
      total: dataParam.total
    }
  }
  pagar() {
    let user = sessionStorage.getItem("user");
    let jsonUser = JSON.parse(atob(user))
    if (this.model.methodpay === "paypal") {
      this.paquetePay.packageId = this.paquete.PackageId
      this.paquetePay.idUser = jsonUser.id
      this.paymentService.createPaymentPaypal(this.paquetePay).subscribe(data => {
        if (data.statusText === "OK") {
          let json = {
            idSell: data.objetoRespuesta.idSell,
            idGroup: data.objetoRespuesta.idGroup,
            nrStudent: data.objetoRespuesta.nrStudent
          }
          sessionStorage.setItem("user_", btoa(JSON.stringify(json)))
          sessionStorage.setItem("token_", data.objetoRespuesta.tokenPayment)
          window.location.href = data.objetoRespuesta.urlPaypal;
        } else {

        }
      });
    } else if (this.model.methodpay === "transferencia") {
      let jsonParam ={
        packageId:this.paquete.PackageId,
        idUser:jsonUser.id
      }
      this.paymentService.createPaymentTransferencia(jsonParam).subscribe(data => {
        if (data.statusText === "OK") {
          let param = { p: this.jsonData }
          this.router.navigate(['/transferencia', param]);
        }
      })
      /* this.getPaymentMethod.emit(this.model.methodpay) */
    }
  }
  cancel() {
    this.router.navigate(['/paquetes']);
  }
}
