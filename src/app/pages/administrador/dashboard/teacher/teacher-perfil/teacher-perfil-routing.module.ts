import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeacherPerfilComponent} from './teacher-perfil.component'
const routes: Routes = [
  { path: '', component: TeacherPerfilComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherPerfilRoutingModule { }
