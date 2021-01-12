import { TranslateLabelService } from '../../../../../services/labels-translate/translate.service'
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { PrivateStudentService } from '../../../../../services/administrador/dashboard/private-student.service'
import { GeneralService } from '../../../../../services/general.service'
import { PackageService } from '../../../../../services/package/package.service'
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { countries } from '../../../../../../assets/countries/countries'
import { states } from '../../../../../../assets/countries/states'
import { day,month,year,codigoPais } from '../../../../../../assets/countries/birthDate'
@Component({
  selector: 'app-student-registro',
  templateUrl: './student-registro.component.html',
  styleUrls: ['./student-registro.component.css']
})
export class StudentRegistroComponent implements OnInit {
  localeLang: string = 'es';
  packagesTemporal: any;
  packages: any;
  countries: any[]
  birthStates: any[]
  birthday: any[]
  codigoPais:any[]
  month: any[]
  year: any[]
  residentStates: any[]
  model = {
    countPerson: 1
  }
  timeZone: any;
  studentsModel = {
    resourceDTO: [],
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
    residentCountry: "",
    residentState: "",
    reason: "",
    packageId: "",
    studentType:"STUDENT_PRIVATE",
    role: "ROLE_STUDENT"
  };
  constructor(
    private translate: TranslateService,
    private translateLabelService: TranslateLabelService,
    private privateStudentService: PrivateStudentService,
    private generalService: GeneralService,
    private packageService: PackageService,
    private router: Router,
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
    this.codigoPais= codigoPais
    this.year =year
    this.packageService.allPackage("PS").subscribe(data => {
      if (data.statusText === "OK") {
        this.packagesTemporal = data.objetoRespuesta
        this.packages = this.packagesTemporal.filter(x => x.nrStudent == 1)
      }
    })
    this.generalService.allTimeZone().subscribe(data => {
      if (data.statusText == "OK") {
        this.timeZone = data.objetoRespuesta
      }
    })
  }
  viewStatesBirth(id) {
    this.birthStates = states.filter(x => x.country_id == id)
  }
  viewStatesResident(id) {
    this.residentStates = states.filter(x => x.country_id == id)
  }
  errorDate: boolean = true
  saveStudent() {
    this.errorDate = this.validarFecha(this.studentsModel.birthday, this.studentsModel.birthmonth, this.studentsModel.birthyear)
    if (!this.errorDate) {
      return
    }
    const emailErr = this.validateEmail();
    if (!emailErr) {
      return
    }
  
   
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-info',
            cancelButton: 'btn btn-secondary'
          },
          buttonsStyling: false
        })
    
        swalWithBootstrapButtons.fire({
          title: '<div class="m-title-input m-border-line"> Agregar Alumno Particular </div>',
          html: `<div class="m-subtitle"> Se agregará a  ${this.studentsModel.name}  ${this.studentsModel.lastName} </div> 
          <div class="m-confirm-text">¿Desea Confirmar?</div>`,
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.generalService.addUser(this.studentsModel).subscribe(data => {
              if (data.statusText === "OK") {
                this.router.navigate(['/private-student']);
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
            
          } else if (
            result.dismiss === Swal.DismissReason.cancel) { }
        })
   
 

  }
  arrayFile = []
  getDataFiles(dataFiles) {
    this.studentsModel.resourceDTO = []
    dataFiles.forEach(element => {
      if (element.typeUpload == "profile") {
        document.getElementById("photoperfil")["src"] = element.url
      }
      this.arrayFile.push({ id: element.id, name: element.nameGroup , url:element.url})
    });
    this.studentsModel.resourceDTO = this.arrayFile;
    let hash = {};
    this.studentsModel.resourceDTO = this.studentsModel.resourceDTO.filter(function (current) {
      var exists = !hash[current.id];
      hash[current.id] = true;
      return exists;
    });
  }
  changePerson() {
    this.packages = []
    this.packages = this.packagesTemporal.filter(x => x.nrStudent == this.model.countPerson)
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
  cancelTeacher(){
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '<div class="m-title-input m-border-line">Cancelar </div>',
      html: `<div class="m-subtitle"> Se cancelara agregar un nuevo usuario</div> 
      <div class="m-confirm-text">¿Desea confirmar?</div>`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/private-student']);

      } else if (
        result.dismiss === Swal.DismissReason.cancel) { }
    })
  }

}
