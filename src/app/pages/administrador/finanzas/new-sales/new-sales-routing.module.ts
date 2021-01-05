import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewSalesComponent} from './new-sales.component'
const routes: Routes = [
  { path: '', component: NewSalesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewSalesRoutingModule { }
