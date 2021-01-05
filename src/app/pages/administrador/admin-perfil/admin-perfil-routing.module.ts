import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPerfilComponent} from './admin-perfil.component'
const routes: Routes = [
  { path: '', component: AdminPerfilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPerfilRoutingModule { }
