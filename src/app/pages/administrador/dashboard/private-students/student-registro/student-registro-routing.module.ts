import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentRegistroComponent} from './student-registro.component'
const routes: Routes = [
  { path: '', component: StudentRegistroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRegistroRoutingModule { }
