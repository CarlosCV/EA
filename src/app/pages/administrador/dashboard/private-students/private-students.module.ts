import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateStudentsComponent } from './private-students.component';
import { ActivosComponent } from './activos/activos.component';
import { InactivosComponent } from './inactivos/inactivos.component';
import { RouterModule } from '@angular/router';
import {PrivateStudentRoutingModule} from './private-students-routing.module'
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [PrivateStudentsComponent, ActivosComponent, InactivosComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    PrivateStudentRoutingModule,
    FormsModule
  ],
  exports: [ PrivateStudentsComponent ],
  entryComponents: [PrivateStudentsComponent]
})
export class PrivateStudentsModule { }
