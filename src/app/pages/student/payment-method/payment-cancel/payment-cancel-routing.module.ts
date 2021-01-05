import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentCancelComponent } from './payment-cancel.component';

const routes: Routes = [
  { path: '', component: PaymentCancelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentCancelRoutingModule { }
