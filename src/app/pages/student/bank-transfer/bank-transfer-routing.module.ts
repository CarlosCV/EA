import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BankTransferComponent} from './bank-transfer.component'
const routes: Routes = [
  { path: '', component: BankTransferComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankTransferRoutingModule { }
