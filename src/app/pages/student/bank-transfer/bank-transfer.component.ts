import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SteperRouterService } from '../../../services/student/steper-router.service'
@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.component.html',
  styleUrls: ['./bank-transfer.component.css']
})
export class BankTransferComponent implements OnInit {
  jsonData:string
  paquete = {
    PackageId: "",
    total: ""
  }
  constructor(
    private steperRouterService: SteperRouterService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.jsonData = this.activatedRoute.snapshot.paramMap.get("p");
    let dataParam = JSON.parse(atob(this.jsonData))
    this.paquete = {
      PackageId: dataParam.id,
      total: dataParam.total
    }
  }
  tabEvaluacion() {
    /*     this.getnextStep.emit(true) */
    this.steperRouterService.NextStep("stepEvaluacion")
  }

}
