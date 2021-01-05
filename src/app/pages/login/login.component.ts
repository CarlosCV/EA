import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/authentication/login.service'
import { Router } from '@angular/router';
import { HeaderService } from '../../services/reusable/header.service'
import { environment } from '../../../environments/environment'
import {GeneralService} from '../../services/general.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ip = environment.backendApis
  model = {
    email: "",
    password: ""
  }
  statusRequest = {
    success: false,
    error: false,
    emailError: false
  }
  constructor(
    private loginService: LoginService,
    private router: Router,
    private headerService: HeaderService,
    private generalService:GeneralService
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem("access_Token")) {
      sessionStorage.removeItem("access_Token")
    }
    if (sessionStorage.getItem("path")) {
      sessionStorage.removeItem("path")
    }
    if (sessionStorage.getItem("user_")) {
      sessionStorage.removeItem("user_")
    }
    if (sessionStorage.getItem("user")) {
      sessionStorage.removeItem("user")
    }
    if (sessionStorage.getItem("token_")) {
      sessionStorage.removeItem("token_")
    }

  }
  login() {
    let json = {
      email: this.model.email.trim(),
      password: this.model.password.trim()
    }
    let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(json.email)) {
      this.statusRequest.emailError = true;
      setTimeout(() => {
        this.statusRequest.emailError = false
      }, 2000);
      return false;
    }
    this.loginService.doLogin(json).subscribe(data => {
      if (data) {
        let jsonUser = this.generalService.parseJwt(data.token);
        this.statusRequest.success = true
        document.getElementById("loader").classList.remove("done") 
        sessionStorage.setItem('access_Token', data.token);
        if (jsonUser.authorities[0] === "ROLE_ADMIN") {
          this.router.navigate(['/teacher']);
        } else if (jsonUser.authorities[0] === "ROLE_STUDENT") {
          this.generalService.userDetail({ email: jsonUser.sub }).subscribe(item => {
            if (item.statusText === "OK") {

              if (item.objetoRespuesta.status === "PENDING_GUEST") {
                this.loginService.getGroup(item.objetoRespuesta.id).subscribe(subitem => {
                  if (subitem.statusText === "OK") {
                    let param = { p: [btoa(JSON.stringify(subitem.objetoRespuesta[0]))] }
                    this.router.navigate(['/executePayment', param]);
                  }
                })
              }
              else {
                /*  jsonUser.authorities[0] = "ROLE_ADMIN" */
                this.router.navigate(['/type-classes']);
              }
            }
          })
        }
        else if (jsonUser.authorities[0] === "ROLE_TEACHER") {
          this.router.navigate(['/registro-profesor']);
        }
        document.getElementById("loader").classList.add("done")
      } else {

      }

    }, err => {
      this.statusRequest.error = true
      setTimeout(() => {
        this.statusRequest.error = false
      }, 2000);
    })
  }



}
