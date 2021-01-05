import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentSuccessComponent } from './payment-success.component';
import {PaymentSuccessRoutingModule} from './payment-success-rounting.module'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaymentSuccessComponent],
  imports: [
    CommonModule,
    PaymentSuccessRoutingModule,
    FormsModule
  ]
})
export class PaymentSuccessModule { }
