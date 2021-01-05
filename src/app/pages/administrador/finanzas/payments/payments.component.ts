import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {paymentsModel} from '../../../modelos/administrador/finanzas/payments.model'
import {GeneralService} from '../../../../services/general.service'
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  displayedColumns: string[] = ['teacher', 'cellphone', 'email','totalHours','referidos','total','pagadoManual','payForPaypal'];
  payments: paymentsModel[] = [];
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private generalService:GeneralService
  ) { 
 
  }

  ngOnInit() {
    let jsonParam= {
      page:1
    }
    this.generalService.listSales(jsonParam).subscribe(data=>{
      if (data.statusText === "OK") {
        this.payments =data.objetoRespuesta
        this.resultsLength =  this.payments.length;
      }
    })
  }

}
