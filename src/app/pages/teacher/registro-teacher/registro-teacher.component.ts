import { Component, OnInit } from '@angular/core';
import { RegistroTeacherService } from '../../../services/registro-teacher/registro-teacher.service'
import { TranslateLabelService } from '../../../services/labels-translate/translate.service'
import { TranslateService } from '@ngx-translate/core';
import { GeneralService } from '../../../services/general.service'
@Component({
  selector: 'app-registro-teacher',
  templateUrl: './registro-teacher.component.html',
  styleUrls: ['./registro-teacher.component.css']
})
export class RegistroTeacherComponent implements OnInit {
  localeLang: string ='es';
  Specializations: any[]
  edades: any[]
  modelteacher = {
    email: "",
    specializationDTO: [],
    targetGroupDTO: [],
    resourceDTO: [],
    scheduleDTO:[],
    name: "",
    lastName: "",
    birthday: "",
    birthmonth: "",
    birthyear: "",
    cellphone: "",
    countryOrigin: "",
    cityOrigin: "",
    otherOrigin: "",
    countryLiving: "",
    cityLiving: "",
    otherLiving: "",
    aboutMe: "",
    videoPresentation: "",
    role: "ROLE_TEACHER",
    timeZone: "",
    englishType: "",
    address: "",
    paypalEmail: "",
    paypalId: "",
    gender: "",
    methodology: "my methodology"
  };
  constructor(
    private registroTeacherService: RegistroTeacherService,
      private translate: TranslateService,
      private translateLabelService: TranslateLabelService,
      private generalService: GeneralService
  ) { 
    this.translate.setDefaultLang(this.localeLang);
  }

  ngOnInit() {
    this.translateLabelService.change.subscribe(languaje => {
      this.localeLang = languaje
      this.translate.use(languaje);
     });
    this.modelteacher.englishType = "Inglés Americano"
    this.registroTeacherService.allSpecializations().subscribe(data => {
      data.objetoRespuesta.forEach(element => {
        element["checked"] = false;
      });
      this.Specializations = data.objetoRespuesta
    })

    this.registroTeacherService.edades().subscribe(data => {
      data.objetoRespuesta.forEach(element => {
        element["checked"] = false;
      });
      this.edades = data.objetoRespuesta
    })
 
  }

  get resultChekedSpecializations() {
    return this.Specializations.filter(item => item.checked);
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
      this.arrayFile.push({ id: element.id, name: element.nameGroup })
    });
    this.modelteacher.resourceDTO = this.arrayFile;
    let hash = {};
    this.modelteacher.resourceDTO = this.modelteacher.resourceDTO.filter(function (current) {
      var exists = !hash[current.id];
      hash[current.id] = true;
      return exists;
    });
  }
  SendInformation(model) {
    model.specializationDTO = []
    model.targetGroupDTO = []
    this.resultChekedSpecializations.forEach(element => {
      let json = { id: element.id }
      model.specializationDTO.push(json)
    });
    this.resultChekedEdades.forEach(element => {
      let json = { id: element.id }
      model.targetGroupDTO.push(json)
    })
       
    this.registroTeacherService.SendInformationTeacher(model).subscribe(data => {
      if (data.statusText == "OK") {
        alert("Datos guardados con exito")
      } else {
        alert("error!")
      }
    })
  }


}
