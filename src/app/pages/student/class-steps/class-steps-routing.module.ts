import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassStepsComponent} from './class-steps.component'
const routes: Routes = [
  { path: '', component: ClassStepsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassStepsRoutingModule { }
