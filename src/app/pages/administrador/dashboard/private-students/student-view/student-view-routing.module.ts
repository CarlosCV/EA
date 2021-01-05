import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentViewComponent} from './student-view.component'
const routes: Routes = [
  { path: '', component: StudentViewComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentViewRoutingModule { }
