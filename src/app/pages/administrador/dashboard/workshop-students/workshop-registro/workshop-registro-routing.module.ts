import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkshopRegistroComponent} from './workshop-registro.component'
const routes: Routes = [
  { path: '', component: WorkshopRegistroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRegistroRoutingModule { }
