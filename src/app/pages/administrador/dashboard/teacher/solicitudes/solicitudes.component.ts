import { Component, OnInit, ViewChild, ElementRef,Output,EventEmitter } from '@angular/core';
import { TeacherService } from '../../../../../services/administrador/dashboard/teacher.service'
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import Swal from 'sweetalert2'
import { environment } from '../../../../../../environments/environment'
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { GeneralService } from '../../../../../services/general.service'
export interface TeachersModel {
  name: string;
  lastname: string;
  email: string;
  cellphone: string
}
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  _backendUrl = environment
  displayedColumns: string[] = ['photo', 'name', 'lastname', 'email', 'telefono', 'opciones'];
  teachers: TeachersModel[] = [];
  sortedData: TeachersModel[];
  pageIndex: number = 0
  SendjsonFilter = {
    page: 0,
    active:false,
    role: "ROLE_TEACHER",
    status: "PENDING" ,
    filterDTO: {
      gender: null,
      englishType: null,
      name: null,
      specialization: null,
      target:null
    }
  }
 
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @Output() responseData = new EventEmitter<any>();
  @ViewChild('SearchInput', { static: true }) SearchInput: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private generalService: GeneralService

  ) { }

  ngOnInit() {
    this.listSolicitudes(this.pageIndex);
    fromEvent(this.SearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length >= 0)
      , debounceTime(1000)
    ).subscribe((text: string) => {
      this.search();
    });
  }
  getServerDataPaginator(event) {
    this.SendjsonFilter.filterDTO.name = ""
    this.pageIndex = event.pageIndex 
    this.listSolicitudes(this.pageIndex)
  }
  listSolicitudes(page) {
    let json = {
      role: "ROLE_TEACHER",
      status: "PENDING",
      active:false,
      page: page
    }
    console.log(json)
    this.generalService.allUserbyRole(json).subscribe(data => {
      console.log(data)
      if (data.statusText === "OK") {
        this.teachers = data.objetoRespuesta.listUserDTO
        this.resultsLength = data.objetoRespuesta.totalNroElements;
        this.responseData.emit(this.resultsLength)
        this.sortedData = this.teachers.slice();
      }
    })
  }
  search() {
    this.SendjsonFilter.page = this.pageIndex
    this.generalService.allUserbyRole(this.SendjsonFilter).subscribe(data => {
      if (data.statusText === "OK") {
        this.teachers = data.objetoRespuesta.listUserDTO
        this.resultsLength = data.objetoRespuesta.totalNroElements;
        this.sortedData = this.teachers.slice();
        /*  document.getElementById("loader").classList.add("done") */
      }
    })
  }
  btnApproved(teacherModel) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '<div class="m-title-input m-border-line"> Aceptación de solicitud para profesor </div>',
      html: `<div class="m-subtitle"> Estas aceptando al profesor ${teacherModel.name}  ${teacherModel.lastName} </div> 
      <div class="m-confirm-text">Si esta todo bien, dale click en confirmar.</div>`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        let json = {
          id: teacherModel.id,
          status: "APPROVED"
        }
        this.teacherService.AcceptRejectTeachers(json).subscribe(data => {
        
          if (data.statusText === "OK") {
            this.teachers = this.teachers.filter(item => item !== teacherModel)
            this.responseData.emit(this.teachers.length)
            this.sortedData = this.teachers.slice();
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ocurrio un problema!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })

      } else if (
        result.dismiss === Swal.DismissReason.cancel) { }
    })
  }
  OpenProfile(teacher) {
    var jsonParam = {
      id: teacher.id,
      email: teacher.email,
      activeOptions:false,
      buttonsEdit: false
    }
    this.router.navigate(['/teacher/profile/', btoa(JSON.stringify(jsonParam))]);
  }

  btnDenied(teacherModel) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '<div class="m-title-input m-border-line"> Rechazo de profesor </div>',
      html: `<div class="m-subtitle"> Estas rechazando al profesor ${teacherModel.name}  ${teacherModel.lastName} </div> 
      <div class="m-confirm-text">Si esta todo bien, dale click en confirmar.</div>`,
      input: 'text',
      showCloseButton: true,
      inputPlaceholder: "Motivo",
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        let json = {
          id: teacherModel.id,
          status: "DENIED",
          reason: result.value
        }
        this.teacherService.AcceptRejectTeachers(json).subscribe(data => {
          if (data.statusText === "OK") {
            this.teachers = this.teachers.filter(item => item !== teacherModel)
            this.responseData.emit(this.teachers.length)
            this.sortedData = this.teachers.slice();
          } else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ocurrio un problema!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })

      } else if (
        result.dismiss === Swal.DismissReason.cancel) { }
    })
  }
  sortData(sort: Sort) {
    const data = this.teachers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'desc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'lastname': return this.compare(a.lastname, b.lastname, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'telefono': return this.compare(a.cellphone, b.cellphone, isAsc);
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
 
}


