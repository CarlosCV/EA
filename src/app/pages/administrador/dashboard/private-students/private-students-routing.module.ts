import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrivateStudentsComponent} from './private-students.component'
const routes: Routes = [
  { path: '', component: PrivateStudentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateStudentRoutingModule { }
