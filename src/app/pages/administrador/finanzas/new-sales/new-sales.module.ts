import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewSalesComponent } from './new-sales.component';
import {NewSalesRoutingModule} from './new-sales-routing.module'
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
@NgModule({
  declarations: [NewSalesComponent],
  imports: [
    CommonModule,
    NewSalesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    FormsModule,
    MatListModule,
    MatSortModule
  ],
  exports: [ NewSalesComponent ],
  entryComponents: [NewSalesComponent]
})
export class NewSalesModule { }
