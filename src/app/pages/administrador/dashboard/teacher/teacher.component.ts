import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../../services/general.service'
@Component({
  selector: 'app-teachers',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  lengthSolicitudes: number = 0
  statusTab = {
    activos: true,
    inactivos: false,
    solicitudes: false
  }
  constructor(
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    let json = {
      role: "ROLE_TEACHER",
      status: "PENDING",
      active:false,
      page: 0
    }
    this.generalService.allUserbyRole(json).subscribe(data => {
      if (data.statusText === "OK") {
        this.lengthSolicitudes = data.objetoRespuesta.totalNroElements;
      }
    })
  }
  getLengthSolicitudes(valor){
    this.lengthSolicitudes = valor
  }
  OpenActivos() {
    this.statusTab.activos = true
    this.statusTab.inactivos = false
    this.statusTab.solicitudes = false

  }
  OpenInactivos() {
    this.statusTab.activos = false
    this.statusTab.inactivos = true
    this.statusTab.solicitudes = false
  }
  OpenSolicitudes() {
    this.statusTab.activos = false
    this.statusTab.inactivos = false
    this.statusTab.solicitudes = true
  }
 

}
