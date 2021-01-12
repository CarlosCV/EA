import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment'
import { GeneralService } from '../../../services/general.service';

/* import * as io from 'socket.io-client';
const SOCKET_ENDPOINT = 'localhost:3000'; */
import { TranslateLabelService } from '../../../services/labels-translate/translate.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  url: any = environment
  activeLine: boolean = false
  expanded: boolean = false
  expanded2: boolean = false
  socket;
  notification: number = 0;
  user = {
    name: "",
    lastName: ""
  };
  constructor(
    private translateService: TranslateLabelService,
    private router: Router,
    private generalService: GeneralService,

  ) {
  }

  ngOnInit() {
    let dataToken;
    if (sessionStorage.getItem("access_Token")) {
      dataToken = sessionStorage.getItem("access_Token")
    }

    this.generalService.updateUser.subscribe(data=>{
        this.user = {
          name: data.userName,
          lastName: data.lastName
        }

    })
  
    let jsonUser = this.generalService.parseJwt(dataToken);
    this.generalService.userDetail({ email: jsonUser.sub }).subscribe(data => {
      if (data.statusText === "OK") {
        this.user = data.objetoRespuesta
      }
    })

    this.translateService.changeExpanded.subscribe(data => {
      this.expanded = data
    })
  }
  hasClass(el: any) {
    return !(el.getAttribute('class') && el.getAttribute('class').indexOf('show') !== -1);
  }
  setupSocketConnection() {
    /*   this.socket = io(SOCKET_ENDPOINT);
      this.socket.on('message-broadcast', (data: string) => {
        if (data) {
          this.notification =this.notification + 1
        }
      }); */
  }

  traducir(languaje) {
    this.translateService.ChangeLanguaje(languaje);
  }
  close_sesion() {
    sessionStorage.removeItem("access_Token")
    sessionStorage.removeItem("path")
    this.router.navigate(['/login']);
  }
  siderbarView() {

    /*  this.responseData.emit(this.expanded) */
    this.translateService.eventSiderbarView(this.expanded2)
  }





}
