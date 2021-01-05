import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';



@NgModule({
  declarations: [PaymentComponent],
  exports: [ PaymentComponent ],
  entryComponents: [PaymentComponent],
  imports: [
    CommonModule
  ]
})
export class PaymentModule { }
