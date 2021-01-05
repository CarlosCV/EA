import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  model = {
    calendar: true,
    teachers:false
  }
  constructor() { }

  ngOnInit(): void {
  }
  OpenCalendar() {
    this.model.teachers = false;
    this.model.calendar = true;
  }
  OpenTeachers(){
    this.model.calendar = false;
    this.model.teachers = true;
  }


}
