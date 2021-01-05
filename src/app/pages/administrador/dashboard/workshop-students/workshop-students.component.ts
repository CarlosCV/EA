import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workshop-students',
  templateUrl: './workshop-students.component.html',
  styleUrls: ['./workshop-students.component.css']
})
export class WorkshopStudentsComponent implements OnInit {

  statusTab = {
    activos: true,
    inactivos: false,
 
  }
  constructor() { }

  ngOnInit(): void {
  }
  OpenActivos() {
    this.statusTab.activos = true
    this.statusTab.inactivos = false

  }
  OpenInactivos() {
    this.statusTab.activos = false
    this.statusTab.inactivos = true

  }

}
