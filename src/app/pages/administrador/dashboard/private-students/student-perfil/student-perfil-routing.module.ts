import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentPerfilComponent} from './student-perfil.component'
const routes: Routes = [
  { path: '', component: StudentPerfilComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentPerfilRoutingModule { }
