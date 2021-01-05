import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CallendarModule} from '../../reusable/calendar/calendar.module'
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { TeachersComponent } from './teachers/teachers.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';


@NgModule({
  declarations: [ScheduleComponent, TeachersComponent, ConfirmacionComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    CallendarModule
  ]
})
export class ScheduleModule { }
