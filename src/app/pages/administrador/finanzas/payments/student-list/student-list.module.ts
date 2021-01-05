import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentListRoutingModule } from './student-list-routing.module';
import { StudentListComponent } from './student-list.component';
import { ParticularesComponent } from './particulares/particulares.component';
import { TalleresComponent } from './talleres/talleres.component';


@NgModule({
  declarations: [StudentListComponent, ParticularesComponent, TalleresComponent],
  imports: [
    CommonModule,
    StudentListRoutingModule
  ]
})
export class StudentListModule { }
