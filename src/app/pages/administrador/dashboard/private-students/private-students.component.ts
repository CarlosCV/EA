import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-students',
  templateUrl: './private-students.component.html',
  styleUrls: ['./private-students.component.css']
})
export class PrivateStudentsComponent implements OnInit {

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
