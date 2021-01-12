import { TranslateLabelService } from '../../../../../services/labels-translate/translate.service'
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../../../services/administrador/dashboard/teacher.service'
import { RegistroTeacherService } from '../../../../../services/registro-teacher/registro-teacher.service'
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../../../../../services/general.service';
import { FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2'
import { countries } from '../../../../../../assets/countries/countries'
import { states } from '../../../../../../assets/countries/states'
import { day, month, year,codigoPais} from '../../../../../../assets/countries/birthDate'
@Component({
  selector: 'app-teacher-perfil',
  templateUrl: './teacher-perfil.component.html',
  styleUrls: ['./teacher-perfil.component.css']
})
export class TeacherPerfilComponent implements OnInit {
  localeLang: string = 'es';
  Specializations: any[];
  Internacionales: any[]
  birthday: any[]
  month: any[]
  year: any[]
  edades: any[]
  idiomas: any[]
  codigoPais:any[]
  levels: any[]
  levelsTemporal: any[]
  countries: any[]
  birthStates: any[]
  residentStates: any[]
  timeZone: any[];
  titulosFILES: any[] = []
  certificadosFILES: any[] = []
  cvFILES: any[] = []
  titulosFILESTotal: number = 0
  certificadosFILESTotal: number = 0
  activeComponent: boolean = false
  dataParam = {
    id: "",
    email: "",
    buttonsEdit: true,
    activeOptions: true
  }

  modelteacher = {
    email: "".trim(),
    active: true,
    emailConfirm: "".trim(),
    profilePic: "",
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
    methodology: "",
    timeAccepted: ""
  };
  constructor(
    private translate: TranslateService,
    private translateLabelService: TranslateLabelService,
    private teacherService: TeacherService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private registroTeacherService: RegistroTeacherService,
    private generalService: GeneralService,
    private fb: FormBuilder
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
    this.month = month
    this.codigoPais= codigoPais
    this.year = year
    this.generalService.allTimeZone().subscribe(data => {
      if (data.statusText == "OK") {
        this.timeZone = data.objetoRespuesta
      }
    })
    this.dataParam = JSON.parse(atob(this.activatedRoute.snapshot.paramMap.get("param")));
    let json = {
      email: this.dataParam.email
    }

    this.generalService.userDetail(json).subscribe(data => {
      if (data.statusText === "OK") {
        this.modelteacher = data.objetoRespuesta
        this.modelteacher.emailConfirm = this.modelteacher.email;
        this.modelteacher.paypalIdConfirm = this.modelteacher.paypalId;
        this.modelteacher.paypalEmailConfirm = this.modelteacher.paypalEmail;
        this.modelteacher.birthmonth = this.modelteacher.birthmonth.toString()
        this.modelteacher.birthday = this.modelteacher.birthday.toString()
        this.modelteacher.birthyear = this.modelteacher.birthyear.toString()
        this.viewStatesBirth(this.modelteacher.birthCountry);
        this.viewStatesResident(this.modelteacher.residentCountry);
        this.modelteacher.resourceDTO.forEach(element => {
          if (element.name === "titulos") {
            this.titulosFILES.push(element)
            this.titulosFILESTotal = this.titulosFILES.length
          }
          if (element.name === "certificados") {
            this.certificadosFILES.push(element)
            this.certificadosFILESTotal = this.certificadosFILES.length
          }
          if (element.name === "cv") {
            this.cvFILES.push(element)
          }
        });
        this.activeComponent = true
      }
      this.registroTeacherService.allSpecializations().subscribe(item => {
        item.objetoRespuesta.forEach(element => {
          this.Internacionales = []
          element.checked = this.modelteacher.specializationDTO.filter(s => s.id == element.id).length > 0;
        });
        this.Specializations = item.objetoRespuesta
        item.objetoRespuesta.forEach(element => {
          if (element.exam)
            this.Internacionales.push(element)
        });

      });
      this.registroTeacherService.edades().subscribe(item => {
        item.objetoRespuesta.forEach(element => {
          element.checked = this.modelteacher.targetGroupDTO.filter(s => s.id == element.id).length > 0;
        });
        this.edades = item.objetoRespuesta
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
          if (this.modelteacher.languageDTO.length != 0) {
            this.modelteacher.languageDTO.forEach(l => {
              l.idiomas = this.idiomas;
              l.levels = this.levelsTemporal.filter(x => x.name == l.name);
            });
          } else {
            this.modelteacher.languageDTO.push({ idiomas: this.idiomas });
          }

        }
      })
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
  errorDate: boolean = true
  editTeacher(model) {
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
    this.generalService.editProfilebyRole(model).subscribe(data => {
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

  deleteTeacher(modelteacher) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-info',
            cancelButton: 'btn btn-secondary'
          },
          buttonsStyling: false
        })
    
        swalWithBootstrapButtons.fire({
          title: '<div class="m-title-input m-border-line"> Eliminación de Profesor </div>',
          html: `<div class="m-subtitle"> Está eliminando al profesor ${modelteacher.name}  ${modelteacher.lastName} </div> 
          <div class="m-confirm-text">Si está seguro ingrese el motivo y doble click en confirmar, de lo contrario doble click en la x</div>`,
          input: 'text',
          showCloseButton: true,
          inputPlaceholder: "Motivo",
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.generalService.deleteUser(modelteacher.id).subscribe(data => {
              if (data.statusText === "OK") {
                this.route.navigate(['/teacher']);
              } else{
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
  
  

  openVideo(video) {
    document.getElementById("videoIframe")["src"] = video
  }
  stopVideo() {
    let video = document.getElementById("videoIframe")["contentWindow"].document.body.getElementsByTagName('video')[0];
    if (video != undefined)
      video.pause();

  }
  getSchedules(schedules) {
    this.modelteacher.scheduleDTO = schedules;
    /*  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
     let arrayHoras = []
     schedules.forEach(element => {
       let dayNum = element.start.getDay();
       let jsonData = {
         dayNum: dayNum,
         day: days[dayNum],
         hourInit: element.start.getHours(),
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
     this.modelteacher.scheduleDTO = Object.values(sendData); */
  }
  arrayFile = []
  getDataFiles(dataFiles) {
    this.modelteacher.resourceDTO = []
    dataFiles.forEach(element => {
      if (element.typeUpload == "profile") {
        /* document.getElementById("photoperfil")["src"] = element.url */
        this.modelteacher.profilePic = element.url
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
          this.modelteacher.active = true
        } else {
          this.modelteacher.active = false
        }
      }
    })
  }
  /*  contador: any = 0
   getFormControls(): AbstractControl[] {
     return (<FormArray>this.userForm.get('languages')).controls
   } */

  getLanguage(id) {
    let json = {
      id: id
    }
    this.modelteacher.languageDTO.push(json)
  }
  errorEmail: boolean = true
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
  compareObjects(o1: any, o2: any): boolean {
    return o1 && o2 && o1 + "" === o2 + "";
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
}
