import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule

  ]
})
export class PaymentsModule { }
