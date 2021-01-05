import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { PackageService } from '../../../../services/package/package.service'
@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  packages: any;
  @Output() getPaquete = new EventEmitter<any>();
  constructor(
    private packageService: PackageService
  ) { }

  ngOnInit() {
    this.packageService.allPackage("PS").subscribe(data => {
      if (data.statusText === "OK") {
        this.packages = data.objetoRespuesta
      }
    })
  }
  selectPaquete(paquete){
    this.getPaquete.emit(paquete)
  }

}
