import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../../../services/payment/payment.service'
import { SteperRouterService } from '../../../../services/student/steper-router.service'
@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  paySuccess: boolean = false;
  guestAccount: boolean = false;
  emails: [any]
  modelInvite = {
    idSell: "",
    idGroup: "",
    emailGuest: []
  }
  nrStudent: number;
  constructor(
    private paymentService: PaymentService,
    private router: ActivatedRoute,
    private steperRouterService: SteperRouterService
  ) { }

  ngOnInit() {
    if (this.router.snapshot.paramMap.get("p")) {
      let jsonData = this.router.snapshot.paramMap.get("p");
      let dataParam = JSON.parse(atob(jsonData))
      this.modelInvite.idSell = dataParam.idSell;
      this.modelInvite.idGroup = dataParam.id;
      this.nrStudent = dataParam.nrStudent;
      document.getElementById("guestAccount").style.display = "block"
      document.getElementById("btnSuccessPay").style.display = "block"
    } else {
      let json;
      let user_ = JSON.parse(atob(sessionStorage.getItem("user_")))
      this.router.queryParams.subscribe(params => {
        json = {
          idSell: user_.idSell,
          paymentId: params["paymentId"],
          payerId: params["PayerID"],
          tokenPayment: sessionStorage.getItem("token_"),
        }
      })
      this.paymentService.executePayment(json).subscribe(data => {
        if (data.statusText == "OK") {
          if (sessionStorage.getItem("token_")) {
            sessionStorage.removeItem("token_")
          }
          document.getElementById("successPay").style.display = "block"
          document.getElementById("btnSuccessPay").style.display = "block"
          if (user_.idGroup && user_.nrStudent) {
            this.modelInvite.idSell = user_.idSell;
            this.modelInvite.idGroup = user_.idGroup;
            this.nrStudent = user_.nrStudent;
            document.getElementById("guestAccount").style.display = "block"
          } else {
          }
        } else {
          alert("el pago no se pudo procesar")
        }
      })
    }
  }
  tabEvaluations() {
    this.steperRouterService.NextStep("stepEvaluacion")
  }
  InviteGuest() {
    this.modelInvite.emailGuest.push(this.emails);
    this.paymentService.inviteStudent(this.modelInvite).subscribe(data => {
      if (data.statusText == "OK") {
        alert("Amigos invitados")
      }


    })
  }

}
