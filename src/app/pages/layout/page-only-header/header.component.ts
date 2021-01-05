import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../services/reusable/header.service'
import { LoginService } from '../../../services/authentication/login.service'
import { Router } from '@angular/router';
import {TranslateLabelService} from '../../../services/labels-translate/translate.service'
import { GeneralService } from '../../../services/general.service';
@Component({
  selector: 'app-page-only-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class PageOnlyHeaderComponent implements OnInit {
user={
  name:"",
  lastName:""
};
  constructor(
    private headerService: HeaderService,
    private loginService: LoginService,
    private translateService:TranslateLabelService,
    private generalService:GeneralService,
    private router: Router
  ) { }

  ngOnInit() {
    let dataToken;
    if (sessionStorage.getItem("access_Token")) {
      dataToken =sessionStorage.getItem("access_Token")
    }
    let jsonUser = this.generalService.parseJwt(dataToken);
    this.generalService.userDetail({email: jsonUser.sub}).subscribe(data => {
      if (data.statusText === "OK"){
        this.user= data.objetoRespuesta
        sessionStorage.setItem("user",btoa(JSON.stringify(this.user)));
      }
    })
  }
  traducir(languaje) {
    this.translateService.ChangeLanguaje(languaje);
  }

}
