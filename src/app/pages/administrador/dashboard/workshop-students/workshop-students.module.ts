import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopStudentsComponent } from './workshop-students.component';
import { InactivosComponent } from './inactivos/inactivos.component';
import { ActivosComponent } from './activos/activos.component';
import { RouterModule } from '@angular/router';
import {WorkshopStudentRoutingModule} from './workshop-students-routing.module'
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [WorkshopStudentsComponent, InactivosComponent, ActivosComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSortModule,
    WorkshopStudentRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule
  ],
  exports: [ WorkshopStudentsComponent ],
  entryComponents: [WorkshopStudentsComponent]
})
export class WorkshopStudentsModule { }
