import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../../services/package/package.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  packagesTemporal: any;
  packages: any;
  model = {
    countPerson: 1
  }
  constructor(
    private packageService: PackageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.packageService.allPackage("PS").subscribe(data => {
      if (data.statusText === "OK") {
        this.packagesTemporal = data.objetoRespuesta
        this.packages = this.packagesTemporal.filter(x => x.nrStudent == 1)
  
      }
    })
  }
  selectPaquete(paquete) {
    let param = {
      p: [
        btoa(JSON.stringify(paquete)) 
      ]
    }
    this.router.navigate(['/metodo-pago', param]);
    /*   this.getPaquete.emit(paquete) */
  }
  changePerson() {
    this.packages = []
    this.packages = this.packagesTemporal.filter(x => x.nrStudent == this.model.countPerson)

  }

}
