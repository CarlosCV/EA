import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  model = {
    calendar: false,
    confirmacion:true
  }
  constructor() { }

  ngOnInit(): void {
  }
  openCalendar(){
    this.model.confirmacion=false
    this.model.calendar=true;
  }
  openConfirmacion(){
    this.model.calendar=false;
    this.model.confirmacion=true
  }

}
