import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkshopPerfilComponent} from './workshop-perfil.component'
const routes: Routes = [
  { path: '', component: WorkshopPerfilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopPerfilRoutingModule { }
