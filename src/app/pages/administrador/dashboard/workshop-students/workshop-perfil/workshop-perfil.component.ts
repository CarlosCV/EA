import { TranslateLabelService } from '../../../../../services/labels-translate/translate.service'
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../../../services/general.service'
import { PackageService } from '../../../../../services/package/package.service'
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { countries } from '../../../../../../assets/countries/countries'
import { states } from '../../../../../../assets/countries/states'
import { day,month,year,codigoPais} from '../../../../../../assets/countries/birthDate'
@Component({
  selector: 'app-workshop-perfil',
  templateUrl: './workshop-perfil.component.html',
  styleUrls: ['./workshop-perfil.component.css']
})
export class WorkshopPerfilComponent implements OnInit {

  localeLang: string = 'es';
  displayedColumns: string[] = [ 'datePay','nrAlumnos', 'horas', 'typePay', 'status'];
  paquetes: any[];
  packagesTemporal: any;
  packages: any;
  countries: any[]
  birthStates: any[]
  birthday: any[]
  codigoPais:any[]
  month: any[]
  year: any[]
  residentStates: any[]
  startDate:any
  endDate:any
  model = {
    countPerson: 1
  }
  dataParam: {
    email: "",
    id: "",
    buttonsEdit:true
  }
  studentsModel = {
    id: "",
    active: true,
    resourceDTO: [],
    profilePic: "",
    email: "".trim(),
    emailConfirm: "".trim(),
    name: "",
    lastName: "",
    address: "",
    prefix: "",
    cellphone: "",
    timeZone: "",
    birthday: "",
    birthmonth: "",
    birthyear: "",
    birthCountry: "",
    birthState: "",
    residentCountry : "",
    residentState : "",
    reason: "",
    packageId: 0,
    role: "ROLE_STUDENT"
  };
 
  timeZone: any;
  constructor(
    private translate: TranslateService,
    private translateLabelService: TranslateLabelService,
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private packageService: PackageService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.translate.use(this.localeLang);
    this.translateLabelService.change.subscribe(languaje => {
      this.localeLang = languaje
      this.translate.use(languaje);
    });
    this.countries = countries
    this.birthday = day
    this.month=month
    this.year =year
    this.codigoPais= codigoPais
    this.dataParam = JSON.parse((atob(this.activatedRoute.snapshot.paramMap.get("param"))));
    let jsoParam = {
      email: this.dataParam.email
    }
    this.generalService.userDetail(jsoParam).subscribe(data => {
      if (data.statusText === "OK") {
       /*  data.objetoRespuesta.resourceDTO.forEach(element => {
          if (element.name === "profilePic") {
            document.getElementById("photoperfil")["src"] = element.url
          }
        }); */
        this.studentsModel = data.objetoRespuesta;
        this.studentsModel.emailConfirm=this.studentsModel.email;
        this.studentsModel.birthmonth = this.studentsModel.birthmonth.toString()
        this.studentsModel.birthday = this.studentsModel.birthday.toString()
        this.studentsModel.birthyear = this.studentsModel.birthyear.toString()
        this.viewStatesBirth(this.studentsModel.birthCountry);
        this.viewStatesResident(this.studentsModel.residentCountry);
        /* this.studentsModel.packageId=0 */
        console.log(this.studentsModel)
      }
    })
    this.generalService.allTimeZone().subscribe(data => {
      if (data.statusText == "OK") {
        this.timeZone = data.objetoRespuesta
      }
    })

    this.packageService.allPackage("WS").subscribe(data => {
      if (data.statusText === "OK") {
        this.packagesTemporal = data.objetoRespuesta
        this.packages = this.packagesTemporal.filter(x => x.nrStudent == 1)
      }
    })
  }
  viewStatesBirth(id) {
    this.birthStates = states.filter(x => x.country_id == id)
  }
  viewStatesResident(id) {
    this.residentStates = states.filter(x => x.country_id == id)
  }
 
  activeOrInactiveUser(active) {
    this.generalService.activeOrInactiveUser(this.dataParam.id, active).subscribe(data => {
      if (data.statusText === "OK") {
        if (active) {
          this.studentsModel.active = true
        } else {
          this.studentsModel.active = false
        }
      }
    })
  }
  arrayFile = []
  getDataFiles(dataFiles) {
    this.studentsModel.resourceDTO = []
    dataFiles.forEach(element => {
      if (element.typeUpload == "profile") {
        this.studentsModel.profilePic = element.url
      }
      this.arrayFile.push({ id: element.id, name: element.nameGroup, url: element.url })
    });
    this.studentsModel.resourceDTO = this.arrayFile;
    let hash = {};
    this.studentsModel.resourceDTO = this.studentsModel.resourceDTO.filter(function (current) {
      var exists = !hash[current.id];
      hash[current.id] = true;
      return exists;
    });
    console.log(this.studentsModel)
  }
  errorDate: boolean = true
  editStudent() {
    this.errorDate = this.validarFecha(this.studentsModel.birthday, this.studentsModel.birthmonth, this.studentsModel.birthyear)
    if (!this.errorDate) {
      return
    }
    const emailErr = this.validateEmail();
    if (!emailErr) {
      return
    }
    console.log(this.studentsModel)
    this.generalService.editProfilebyRole(this.studentsModel).subscribe(data => {
      if (data.statusText == "OK") {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Datos actualizados.',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un problema!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  changePerson() {
    this.packages = []
    this.packages = this.packagesTemporal.filter(x => x.nrStudent == this.model.countPerson)
  }
  deleteStudent() {
    this.generalService.deleteUser(this.studentsModel.id).subscribe(data => {
      if (data.statusText == "OK") {
        this.router.navigate(['/workshop-student']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Alumno ha sido eliminado.',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  validarFecha(d, m, a) {
    var ok = true;
    if ((a < 1900) || (a > 2050) || (m < 1) || (m > 12) || (d < 1) || (d > 31))
      ok = false;
    else {
      if ((a % 4 != 0) && (m == 2) && (d > 28))
        ok = false;
      else {
        if ((((m == 4) || (m == 6) || (m == 9) || (m == 11)) && (d > 30)) || ((m == 2) && (d > 29)))
          ok = false;
      }
    }
    return ok;
  }
  errorEmail: boolean = true
  validateEmail() {
    if (this.studentsModel.emailConfirm) {
      if (this.studentsModel.emailConfirm !== this.studentsModel.email) {
        this.errorEmail = false
      } else {
        this.errorEmail = true
      }
    }
    return this.errorEmail;
  }
}
