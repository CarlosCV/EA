import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkshopStudentsComponent} from './workshop-students.component'
const routes: Routes = [
  { path: '', component: WorkshopStudentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopStudentRoutingModule { }
