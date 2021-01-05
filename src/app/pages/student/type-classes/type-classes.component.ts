import { Component, OnInit } from '@angular/core';
import { TranslateLabelService } from '../../../services/labels-translate/translate.service'
import { TranslateService } from '@ngx-translate/core';
import { GeneralService } from '../../../services/general.service'
@Component({
  selector: 'app-type-classes',
  templateUrl: './type-classes.component.html',
  styleUrls: ['./type-classes.component.css']
})
export class TypeClassesComponent implements OnInit {
  user: any;
  localeLang: string = 'en';
  constructor(
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
  }

  updateStudentType(type) {
    let dataToken;
    if (sessionStorage.getItem("access_Token")) {
      dataToken = sessionStorage.getItem("access_Token")
    }
    let jsonUser = this.generalService.parseJwt(dataToken);
    this.generalService.updateStudentType({ email: jsonUser.sub, studentType: type }).subscribe(data => {
      if (data.statusText === "OK") {
      }
    })
  }

}
