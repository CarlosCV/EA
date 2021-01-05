import { TranslateLabelService } from '../../../services/labels-translate/translate.service'
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import Swal from 'sweetalert2'
import { countries } from '../../../../assets/countries/countries'
import { states } from '../../../../assets/countries/states'
import { day,month,year } from '../../../../assets/countries/birthDate'
@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {
  localeLang: string = 'es';
  countries: any[]
  states: any[]
  birthday: any[]
  month: any[]
  year: any[]
  timeZone: any;
  birthStates: any[]
  residentStates: any[]
  modelAdmin = {
    resourceDTO: [],
    email: "".trim(),
    emailConfirm: "".trim(),
    newpassword: "",
    passwordConfirm: "",
    name: "",
    lastName: "",
    gender: "",
    timeZone: "",
    prefix: "",
    cellphone: "",
    birthday: "",
    birthmonth: "",
    birthyear: "",
    birthCountry: "",
    birthState: "",
    residentCountry: "",
    residentState: "",
    address: "",
    profilePic: "",
    role: "ROLE_ADMIN",
  }
  constructor(
    private translate: TranslateService,
    private translateLabelService: TranslateLabelService,
    private generalService: GeneralService,
  ) {
    this.translate.setDefaultLang(this.localeLang);
  }

  
  ngOnInit() {

    this.translateLabelService.change.subscribe(languaje => {
      this.localeLang = languaje
      this.translate.use(languaje);
    });
    this.countries = countries
    this.birthday = day
    this.month=month
    this.year =year
    /* this.states = states */
    let dataToken;
    if (sessionStorage.getItem("access_Token")) {
      dataToken = sessionStorage.getItem("access_Token")
    }
    let jsonUser = this.generalService.parseJwt(dataToken);
    this.generalService.userDetail({ email: jsonUser.sub }).subscribe(data => {
      if (data.statusText == "OK") {
        this.modelAdmin = data.objetoRespuesta
        this.modelAdmin.emailConfirm = this.modelAdmin.email;
        this.modelAdmin.birthmonth = this.modelAdmin.birthmonth.toString()
        this.modelAdmin.birthday = this.modelAdmin.birthday.toString()
        this.modelAdmin.birthyear = this.modelAdmin.birthyear.toString()
        this.viewStatesBirth(this.modelAdmin.birthCountry);
        this.viewStatesResident(this.modelAdmin.residentCountry);
        if (data.objetoRespuesta.profilePic) {
          document.getElementById("photoperfil")["src"] = this.modelAdmin.profilePic
        }

      }
    })
    this.generalService.allTimeZone().subscribe(data => {
      if (data.statusText == "OK") {
        this.timeZone = data.objetoRespuesta

      }
    })
  }
  arrayFile = []
  getDataFiles(dataFiles) {
    this.modelAdmin.resourceDTO = []
    dataFiles.forEach(element => {
      if (element.typeUpload == "profile") {
        document.getElementById("photoperfil")["src"] = element.url
      }
      this.arrayFile.push({ id: element.id, name: element.nameGroup, url: element.url })
    });
    this.modelAdmin.resourceDTO = this.arrayFile;
    let hash = {};
    this.modelAdmin.resourceDTO = this.modelAdmin.resourceDTO.filter(function (current) {
      var exists = !hash[current.id];
      hash[current.id] = true;
      return exists;
    });
  }
  /*  uploadPhoto() {
     document.getElementById("uploadFile").click();
   } */
  editPassword(email, newPass) {
    let jsonParam = {
      email: email,
      newPassword: newPass
    }
    this.generalService.editPasswordAdmin(jsonParam).subscribe(data => {
      if (data.statusText == "OK") {
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
  errorDate: boolean = true
  editAdmin() {
    this.errorDate = this.validarFecha(this.modelAdmin.birthday, this.modelAdmin.birthmonth, this.modelAdmin.birthyear)
    if (!this.errorDate) {
      return
    }
    this.generalService.editProfilebyRole(this.modelAdmin).subscribe(data => {
      if (data.statusText == "OK") {
        if(this.modelAdmin.email && this.modelAdmin.newpassword){
          this.editPassword(this.modelAdmin.email, this.modelAdmin.newpassword)
        }
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
  viewStatesBirth(id) {
    this.birthStates = states.filter(x => x.country_id == id)
  }
  viewStatesResident(id) {
    this.residentStates = states.filter(x => x.country_id == id)
  }
}
