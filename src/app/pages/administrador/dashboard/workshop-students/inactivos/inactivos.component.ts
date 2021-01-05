import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TeacherService } from '../../../../../services/administrador/dashboard/teacher.service'
import { GeneralService } from '../../../../../services/general.service'
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { StudentModel } from '../../../../modelos/administrador/dashboard/private-student/student.model'
import { Sort } from '@angular/material/sort';
import { environment } from '../../../../../../environments/environment'
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-inactivos',
  templateUrl: './inactivos.component.html',
  styleUrls: ['./inactivos.component.css']
})
export class InactivosComponent implements OnInit {
  _backendUrl = environment
  displayedColumns: string[] = ['photo','name', 'lastname', 'email','telefono', 'opciones'];
  alumnos: StudentModel[] = [];
  sortedData: StudentModel[];
  pageIndex: number=0
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  inputSearch: string;
  SendjsonFilter = {
    role: "ROLE_STUDENT",
    studentType:"STUDENT_WORKSHOP",
    page: 0,
    filterDTO: {
      name: null
    }
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('SearchInput', { static: true }) SearchInput: ElementRef;
  constructor(
    private generalService: GeneralService,
    private router: Router

  ) { }

  ngOnInit() {
   this.listTeacher(this.pageIndex);
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
    this.SendjsonFilter.filterDTO.name =""
    this.pageIndex = event.pageIndex 
    this.listTeacher(this.pageIndex)
  }
  listTeacher(page) {
    let json = {
      role: "ROLE_STUDENT",
      studentType:"STUDENT_WORKSHOP",
      active:false,
      page: page
    }
    document.getElementById("loader").classList.remove("done")
    this.generalService.allUserbyRole(json).subscribe(data => {
      if (data.statusText === "OK") {
        this.alumnos = data.objetoRespuesta.listUserDTO
        this.resultsLength = data.objetoRespuesta.totalNroElements;
        this.sortedData = this.alumnos.slice();
        document.getElementById("loader").classList.add("done")
      }
    });
  }
  OpenProfile(student) {
    var jsonParam = {
      id: student.id,
      email: student.email,
      buttonsEdit:false
    }
    this.router.navigate(['/workshop-student/profile/', btoa(JSON.stringify(jsonParam))]);
  }
 

  search() {
    document.getElementById("loader").classList.remove("done")
    this.generalService.allUserbyRole(this.SendjsonFilter).subscribe(data => {
      if (data.statusText === "OK") {
        this.alumnos = data.objetoRespuesta.listUserDTO.filter(x => x.active == false)
        this.resultsLength = data.objetoRespuesta.totalNroElements;
        this.sortedData = this.alumnos.slice();
        document.getElementById("loader").classList.add("done")
      }
    })
  }
  sortData(sort: Sort) {
    const data = this.alumnos.slice();
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


