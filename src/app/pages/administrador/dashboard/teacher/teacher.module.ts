import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher.component';
import { ActivosComponent } from './activos/activos.component';
import { InactivosComponent } from './inactivos/inactivos.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import {TeacherRoutingModule} from './teacher-routing.module'
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [TeacherComponent,ActivosComponent,SolicitudesComponent,InactivosComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TeacherRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatListModule
  ],
/*   exports: [ TeacherComponent ],
  entryComponents: [TeacherComponent] */
})
export class TeacherModule { }
