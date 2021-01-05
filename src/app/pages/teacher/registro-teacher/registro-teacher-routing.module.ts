import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistroTeacherComponent} from './registro-teacher.component'
const routes: Routes = [
  { path: '', component: RegistroTeacherComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroTeacherRoutingModule { }
