import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TypeClassesComponent} from './type-classes.component'
const routes: Routes = [
  { path: '', component: TypeClassesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeClassesRoutingModule { }
