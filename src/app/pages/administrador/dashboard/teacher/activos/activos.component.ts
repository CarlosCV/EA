import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TeacherService } from '../../../../../services/administrador/dashboard/teacher.service'
import { GeneralService } from '../../../../../services/general.service'
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { RegistroTeacherService } from '../../../../../services/registro-teacher/registro-teacher.service'
import { environment } from '../../../../../../environments/environment'
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
export interface TeachersModel {
  name: string;
  lastname: string;
  ranking:string;
  email: string;
  cellphone: string
}
@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css']
})

export class ActivosComponent implements OnInit {
  _backendUrl = environment
  displayedColumns: string[] = ['photo', 'name', 'lastname', 'ranking', 'email', 'cellphone', 'opciones'];
  Specializations: any[]
  edades: any[]
  teachers: TeachersModel[] = [];
  pageIndex: number=0
  jsonFilter = {
    page: 0,
    role: "ROLE_TEACHER",
    status: "APPROVED",
    filterDTO: {
      gender: null,
      englishType: null,
      name: null,
      specialization: [],
      target: []
    }
  }
  SendjsonFilter = {
    page: 0,
    role: "ROLE_TEACHER",
    status: "APPROVED",
    filterDTO: {
      gender: null,
      englishType: null,
      name: null,
      specialization: [],
      target: []
    }
  }
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  sortedData: TeachersModel[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('SearchInput', { static: true }) SearchInput: ElementRef;
  constructor(
    private teacherService: TeacherService,
    private generalService: GeneralService,
    private registroTeacherService: RegistroTeacherService,
    private router: Router

  ) {
 
  }
  ngOnInit() {
    this.registroTeacherService.allSpecializations().subscribe(data => {
      if (data.statusText === "OK") {
        this.Specializations = data.objetoRespuesta
        this.SendjsonFilter.filterDTO.specialization = this.Specializations
      }
    })
    this.registroTeacherService.edades().subscribe(data => {
      if (data.statusText === "OK") {
        this.edades = data.objetoRespuesta
        this.SendjsonFilter.filterDTO.target = this.edades
      }
    })
    this.listTeacher(this.pageIndex);
    fromEvent(this.SearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , filter(res => res.length >= 0)
      , debounceTime(1000)
    ).subscribe((text: string) => {
      this.filtersOptions("search");
    });
  }

  getServerDataPaginator(event) {
    this.jsonFilter.filterDTO.name =""
    this.pageIndex = event.pageIndex 
    this.resultsLength= 0
    this.listTeacher(this.pageIndex)
  }
  listTeacher(page) {
    let json = {
      role: "ROLE_TEACHER",
      status: "APPROVED",
      active:true,
      page: page
    }
    document.getElementById("loader").classList.remove("done")
    this.generalService.allUserbyRole(json).subscribe(data => {
      if (data.statusText === "OK") {
        this.teachers = data.objetoRespuesta.listUserDTO
        this.resultsLength = data.objetoRespuesta.totalNroElements;
        this.sortedData = this.teachers.slice();
        document.getElementById("loader").classList.add("done")
      }
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
        case 'ranking': return this.compare(a.ranking, b.ranking, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'telefono': return this.compare(a.cellphone, b.cellphone, isAsc);
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  OpenProfile(teacher) {
    var jsonParam = {
      id: teacher.id,
      email: teacher.email,
      activeOptions:true,
      buttonsEdit: true
    }
    this.router.navigate(['/teacher/profile/', btoa(JSON.stringify(jsonParam))]);
  }

  filtersOptions(value) {
    this.SendjsonFilter.page = this.pageIndex  || this.jsonFilter.page
    document.getElementById("loader").classList.remove("done")
    if (value != "search") {
      this.SendjsonFilter.filterDTO.gender = this.jsonFilter.filterDTO.gender
      this.SendjsonFilter.filterDTO.name = this.jsonFilter.filterDTO.name
      this.SendjsonFilter.filterDTO.englishType = this.jsonFilter.filterDTO.englishType
      if (this.jsonFilter.filterDTO.specialization.length > 0) {
        this.SendjsonFilter.filterDTO.specialization = this.jsonFilter.filterDTO.specialization
      } else {
        this.SendjsonFilter.filterDTO.specialization = null
      }
      if (this.jsonFilter.filterDTO.target.length > 0) {
        this.SendjsonFilter.filterDTO.target = this.jsonFilter.filterDTO.target
      } else {
        this.SendjsonFilter.filterDTO.target = null
      }
    } else {
      this.SendjsonFilter.filterDTO.name = this.jsonFilter.filterDTO.name.trim();
      this.jsonFilter.filterDTO.gender = null
      this.SendjsonFilter.filterDTO.gender = null
      this.jsonFilter.filterDTO.englishType = null
      this.SendjsonFilter.filterDTO.englishType = null
      this.jsonFilter.filterDTO.specialization = null
      this.SendjsonFilter.filterDTO.specialization = this.jsonFilter.filterDTO.specialization
      this.jsonFilter.filterDTO.target = null
      this.SendjsonFilter.filterDTO.target = this.jsonFilter.filterDTO.target
    }
    this.generalService.allUserbyRole(this.SendjsonFilter).subscribe(data => {
      if (data.status == 200) {
        this.teachers = data.objetoRespuesta.listUserDTO.filter(x => x.active == true)
        this.resultsLength = data.objetoRespuesta.totalNroElements;
        this.sortedData = this.teachers.slice();
        document.getElementById("loader").classList.add("done")
      }
    })

  }


}



