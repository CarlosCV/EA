import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentMethodRoutingModule } from './payment-method-routing.module';
import { PaymentMethodComponent } from './payment-method.component';


@NgModule({
  declarations: [PaymentMethodComponent],
  imports: [
    CommonModule,
    PaymentMethodRoutingModule,
    FormsModule
  ]
})
export class PaymentMethodModule { }
