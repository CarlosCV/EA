import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherRegistroComponent} from './teacher-registro.component'
const routes: Routes = [
  { path: '', component: TeacherRegistroComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRegistroRoutingModule { }
