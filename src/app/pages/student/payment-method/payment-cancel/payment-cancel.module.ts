import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCancelComponent } from './payment-cancel.component';
import {PaymentCancelRoutingModule} from './payment-cancel-routing.module'


@NgModule({
  declarations: [PaymentCancelComponent],
  imports: [
    CommonModule,
    PaymentCancelRoutingModule
  ]
})
export class PaymentCancelModule { }
