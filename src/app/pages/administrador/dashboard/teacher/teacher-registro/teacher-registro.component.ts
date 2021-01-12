import { TranslateLabelService } from '../../../../../services/labels-translate/translate.service'
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { RegistroTeacherService } from '../../../../../services/registro-teacher/registro-teacher.service'
import { GeneralService } from '../../../../../services/general.service'
import { FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { countries } from '../../../../../../assets/countries/countries'
import { states } from '../../../../../../assets/countries/states'
import { day, month, year, codigoPais } from '../../../../../../assets/countries/birthDate'
@Component({
  selector: 'app-teacher-registro',
  templateUrl: './teacher-registro.component.html',
  styleUrls: ['./teacher-registro.component.css']
})
export class TeacherRegistroComponent implements OnInit {
  localeLang: string = 'es';
  Specializations: any[]
  Internacionales: any[]
  birthday: any[]
  codigoPais: any[]
  month: any[]
  year: any[]
  edades: any[]
  timeZone: any;
  countries: any[]
  birthStates: any[]
  residentStates: any[]
  distrito: any[]
  levelsTemporal: any[]
  idiomas: any[]
  modelteacher = {
    email: "".trim(),
    emailConfirm: "".trim(),
    specializationDTO: [],
    internationalExamDTO: [],
    targetGroupDTO: [],
    resourceDTO: [],
    languageDTO: [],
    scheduleDTO: [],
    name: "",
    lastName: "",
    birthday: "",
    birthmonth: "",
    birthyear: "",
    prefix: "",
    cellphone: "",
    birthCountry: "",
    birthState: "",
    residentCountry: "",
    residentState: "",
    videoPresentation: "",
    role: "ROLE_TEACHER",
    timeZone: "19",
    englishType: "",
    address: "",
    paypalEmail: "",
    paypalId: "",
    paypalEmailConfirm: "",
    paypalIdConfirm: "",
    gender: "",
    methodology: ""
  };
  /*   userForm: FormGroup; */
  constructor(
    private registroTeacherService: RegistroTeacherService,
    private translate: TranslateService,
    private translateLabelService: TranslateLabelService,
    private generalService: GeneralService,
    private fb: FormBuilder,
    private router: Router,
  ) {

    /*     this.userForm = this.fb.group({
          itemLanguage: this.fb.array([
            this.fb.control(null)
          ])
        }) */
  }

  ngOnInit() {
    this.translate.use(this.localeLang);
    this.translateLabelService.change.subscribe(languaje => {
      this.localeLang = languaje
      this.translate.use(languaje);
    });
    this.countries = countries
    this.birthday = day
    this.month = month
    this.year = year
    this.codigoPais = codigoPais
    this.generalService.allTimeZone().subscribe(data => {
      if (data.statusText == "OK") {
        this.timeZone = data.objetoRespuesta

      }
    })
    this.modelteacher.englishType = "Inglés Americano"
    this.registroTeacherService.allSpecializations().subscribe(data => {
      this.Internacionales = []
      data.objetoRespuesta.forEach(element => {
        element["checked"] = false;
      });
      this.Specializations = data.objetoRespuesta
      data.objetoRespuesta.forEach(element => {
        if (element.exam)
          this.Internacionales.push(element)
      });
    })
    this.registroTeacherService.edades().subscribe(data => {
      data.objetoRespuesta.forEach(element => {
        element["checked"] = false;
      });
      this.edades = data.objetoRespuesta
    })
    this.generalService.allLanguages().subscribe(data => {
      if (data.statusText == "OK") {
        this.levelsTemporal = data.objetoRespuesta;
        var hash = {};
        data.objetoRespuesta = data.objetoRespuesta.filter(function (current) {
          var exists = !hash[current.name];
          hash[current.name] = true;
          return exists;
        });
        this.idiomas = data.objetoRespuesta
        this.modelteacher.languageDTO.push({ idiomas: this.idiomas });
      }
    })
  }

  get resultChekedSpecializations() {
    return this.Specializations.filter(item => item.checked);
  }
  get resultChekedInternationalExam() {
    return this.Internacionales.filter(item => item.checked);
  }
  get resultChekedEdades() {
    return this.edades.filter(item => item.checked);
  }
  arrayFile = []
  getDataFiles(dataFiles) {
    this.modelteacher.resourceDTO = []
    dataFiles.forEach(element => {
      if (element.typeUpload == "profile") {
        document.getElementById("photoperfil")["src"] = element.url
      }
      this.arrayFile.push({ id: element.id, name: element.nameGroup, url: element.url })
    });
    this.modelteacher.resourceDTO = this.arrayFile;
    let hash = {};
    this.modelteacher.resourceDTO = this.modelteacher.resourceDTO.filter(function (current) {
      var exists = !hash[current.id];
      hash[current.id] = true;
      return exists;
    });
  }
  getSchedules(schedules) {
    /*  this.modelteacher.scheduleDTO.push(schedules); */
    /* const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
     let arrayHoras = []
     schedules.forEach(element => {
       let dayNum = element.start.getDay();
       let jsonData = {
         dayNum: dayNum,
         day: days[dayNum],
         hourInit:element.start.getHours(),
         hourEnd: element.end.getHours()
       }
       arrayHoras.push(jsonData)
     });
     let sendData = {}
     arrayHoras.forEach(x => {
       if (!sendData.hasOwnProperty(x.dayNum)) {
         sendData[x.dayNum] = {
           day: x.day,
           hour: []
         }
       }
       sendData[x.dayNum].hour.push({
         hourInit: x.hourInit,
         hourEnd: x.hourEnd
       })
     }) 
      this.modelteacher.scheduleDTO = Object.values(sendData);*/
    this.modelteacher.scheduleDTO = schedules;
  }
  errorDate: boolean = true
  SendInformation(model) {
    this.errorDate = this.validarFecha(this.modelteacher.birthday, this.modelteacher.birthmonth, this.modelteacher.birthyear)
    if (!this.errorDate) {
      return
    }
    const emailErr = this.validateEmail();
    if (!emailErr) {
      return
    }
    const idPaypalErr = this.validatePaypalId();
    if (!idPaypalErr) {
      return
    }
    const emailPaypalErr = this.validatePaypalEmail();
    if (!emailPaypalErr) {
      return
    }

    model.specializationDTO = []
    model.internationalExamDTO = []
    model.targetGroupDTO = []
    this.resultChekedSpecializations.forEach(element => {
      let json = { id: element.id }
      model.specializationDTO.push(json)
    });
    this.resultChekedInternationalExam.forEach(element => {
      let json = { id: element.id }
      model.internationalExamDTO.push(json)
    });
    this.resultChekedEdades.forEach(element => {
      let json = { id: element.id }
      model.targetGroupDTO.push(json)
    })
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '<div class="m-title-input m-border-line"> Agregar profesor </div>',
      html: `<div class="m-subtitle"> Se agregará  al profesor ${model.name} </div> 
          <div class="m-confirm-text">¿Desea confirmar?</div>`,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalService.addUser(model).subscribe(data => {
          if (data.statusText == "OK") {
            this.router.navigate(['/teacher']);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'El profesor se registro correctamente.',
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
  videoIngresado() {
    /* document.getElementById("videoIframe")["src"]=this.modelteacher.videoPresentation */
  }
  /* getFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('itemLanguage')).controls
  } */
  /*  OpenLevel(getName) {
     this.levels = this.levelsTemporal.filter(x => x.name == getName)
   } */
  getLanguage(id) {
    let json = {
      id: id
    }
    this.modelteacher.languageDTO.push(json)
  }
  viewStatesBirth(id) {
    this.birthStates = states.filter(x => x.country_id == id)
  }
  viewStatesResident(id) {
    this.residentStates = states.filter(x => x.country_id == id)
  }

  /*  viewdistrito(id){
     this.distrito = distrito.filter(x => x.state_id = id)
   } */

  errorEmail: boolean = true;
  errorPaypalId: boolean = true;
  errorPaypalEmail: boolean = true;
  validateEmail() {
    if (this.modelteacher.emailConfirm) {
      if (this.modelteacher.emailConfirm !== this.modelteacher.email) {
        this.errorEmail = false
      } else {
        this.errorEmail = true
      }
    }
    return this.errorEmail;
  }

  validatePaypalEmail() {
    if (this.modelteacher.paypalEmail || this.modelteacher.paypalEmailConfirm) {
      if (this.modelteacher.paypalEmail !== this.modelteacher.paypalEmailConfirm) {
        this.errorPaypalEmail = false
      } else {
        this.errorPaypalEmail = true
      }
    } else if (!this.modelteacher.paypalEmail && !this.modelteacher.paypalEmailConfirm) this.errorPaypalEmail = true;
    return this.errorPaypalEmail;
  }
  validatePaypalId() {
    if (this.modelteacher.paypalId || this.modelteacher.paypalIdConfirm) {
      if (this.modelteacher.paypalId !== this.modelteacher.paypalIdConfirm) {
        this.errorPaypalId = false
      } else {
        this.errorPaypalId = true
      }
    } else if (!this.modelteacher.paypalId && !this.modelteacher.paypalIdConfirm) this.errorPaypalId = true;
    return this.errorPaypalId;
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
  OpenLevel(language, getName) {
    language.levels = this.levelsTemporal.filter(x => x.name == getName)
  }
  addInputIdioma() {
    this.modelteacher.languageDTO.push({ idiomas: this.idiomas });
  }
  removeInputIdioma(index) {
    this.modelteacher.languageDTO.splice(index, 1);
  }
  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 && o1 + "" === o2 + "";
  }
}
