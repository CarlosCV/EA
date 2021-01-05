import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { newSalesModel } from '../../../modelos/administrador/finanzas/newSales.model'
import { NewSalesService } from '../../../../services/administrador/finanzas/newSales.service'
import Swal from 'sweetalert2'
import { Sort } from '@angular/material/sort';
import { GeneralService } from '../../../../services/general.service'
import { environment } from '../../../../../environments/environment'
import { addDays } from 'date-fns';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
@Component({
  selector: 'app-new-sales',
  templateUrl: './new-sales.component.html',
  styleUrls: ['./new-sales.component.css']
})
export class NewSalesComponent implements OnInit {
  _backendUrl = environment
  displayedColumns: string[] = ['photo', 'completeName', 'cellphone', 'email', 'nrStudents', 'date', 'hours', 'sesiones', 'total', 'pagado'];
  newSales: newSalesModel[] = [];
  sortedData: newSalesModel[];
  pageIndex: number = 1
  filterDate = {
    anio: "",
    mes: ""
  }
  totalVentas: number = 0;
  resultsLength = 0;
  startDate: any
  endDate: any
  searchName: string
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('SearchInput', { static: true }) SearchInput: ElementRef;
  constructor(
    private newSalesService: NewSalesService,
    private generalService: GeneralService,
  ) { }

  ngOnInit() {
    this.listNewVentas(this.pageIndex, "all");
   
    fromEvent(this.SearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , filter(res => res.length >= 0)
      , debounceTime(1000)
    ).subscribe((text: string) => {
      let jsonParam = {
        page: this.pageIndex,
        searchName: this.searchName
      }
      this.listSalesSearch(jsonParam)
    });
  }
  btnPagar(item) {
    let jsonParam = {
      idSell: item.idSell,
      paymentId: item.paymentId
    }
    this.newSalesService.paybyTranferencia(jsonParam).subscribe(data => {
      if (data.statusText === "OK") {
        this.listNewVentas(this.pageIndex, "all");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pago registrado!.',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  getServerDataPaginator(event) {
    this.pageIndex = event.pageIndex + 1
    this.listNewVentas(this.pageIndex, "all")
  }
  filtersSales() {
    this.startDate="";
    this.endDate="";
    if (this.filterDate.mes && this.filterDate.anio){
      this.listNewVentas(this.pageIndex, "filterAnio")
    }
    if (this.filterDate.mes == '0' || this.filterDate.anio == '0'){
      this.listNewVentas(this.pageIndex, "all")
    }
   
  }
  filterSalesRange(type) {
    this.filterDate.mes="0";
    this.filterDate.anio="0";
    if (this.endDate) {
      this.listNewVentas(this.pageIndex, type)
    }
  }
  listNewVentas(page, type) {
    document.getElementById("loader").classList.remove("done")
    let jsonParam = {}
    if (type === "filterAnio") {
      jsonParam = {
        page: page,
        year: this.filterDate.anio,
        month: this.filterDate.mes
      }
    }
    if (type === "filter") {
      jsonParam = {
        page: page,
        startDate: this.startDate,
        endDate: addDays(this.endDate, 1)
      }
    }
    if (type === "all") {
      jsonParam = {
        page: page
      }
    }
    this.listSales(jsonParam)
  }
  listSales(jsonParam) {
    this.totalVentas =0;
    this.generalService.listSales(jsonParam).subscribe(data => {
      if (data.statusText === "OK") {
        this.newSales = data.objetoRespuesta
        if (this.newSales) {
          this.resultsLength = this.newSales.length;
          this.newSales.forEach(element => {
            if (element.status === "PAID") {
              this.totalVentas += element.total
            }
          });
          this.sortedData = this.newSales.slice();
          document.getElementById("loader").classList.add("done")
        } else {
          this.sortedData = []
          this.totalVentas = 0
          document.getElementById("loader").classList.add("done")
        }

      }
    })
  }

  listSalesSearch(jsonParam) {
    this.totalVentas =0;
    document.getElementById("loader").classList.remove("done")
    this.generalService.listSales(jsonParam).subscribe(data => {
      if (data.statusText === "OK") {
        this.newSales = data.objetoRespuesta
        if (this.newSales) {
          this.resultsLength = this.newSales.length;
          this.newSales.forEach(element => {
            if (element.status === "PAID") {
              this.totalVentas += element.total
            }
          });
          this.sortedData = this.newSales.slice();
          document.getElementById("loader").classList.add("done")
        } else {
          this.sortedData = []
          this.totalVentas = 0
          document.getElementById("loader").classList.add("done")
        }

      }
    })
  }
  sortData(sort: Sort) {
    const data = this.newSales.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'desc';
      switch (sort.active) {
        case 'completeName': return this.compare(a.completeName, b.completeName, isAsc);
        case 'cellphone': return this.compare(a.cellphone, b.cellphone, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'nrStudents': return this.compare(a.nrStudents, b.nrStudents, isAsc);
        case 'date': return this.compare(a.date, b.date, isAsc);
        case 'hours': return this.compare(a.hours, b.hours, isAsc);
        case 'sesiones': return this.compare(a.sesiones, b.sesiones, isAsc);
        case 'total': return this.compare(a.total, b.total, isAsc);
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  /*   downloadExcell(){
      this.generalService.downloadSales().subscribe(data=>{

      })
    } */

}
