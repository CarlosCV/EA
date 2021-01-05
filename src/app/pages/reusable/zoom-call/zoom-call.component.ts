import { Component, OnInit ,Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ZoomMtg } from '@zoomus/websdk';
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
@Component({
  selector: 'app-zoom-call',
  templateUrl: './zoom-call.component.html',
  styleUrls: ['./zoom-call.component.css']
})
export class ZoomCallComponent implements OnInit {
  signatureEndpoint = 'https://firma-zoom.herokuapp.com/'
  apiKey = 'lutPC0C9T76fg1sBhL1dHA'
  meetingNumber = 4510834995
  role = 0
  leaveUrl = 'http://localhost:4200/'
  userName = 'Carlos Cruz'
  userEmail = 'cruzvenegasc@gmail.com'
  passWord =""

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {

  }

  ngOnInit(): void {
  }

  getSignature() {
    this.httpClient.post(this.signatureEndpoint, {
	    meetingNumber: this.meetingNumber,
	    role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        this.startMeeting(data.signature)
      } else {
      }
    }).catch((error) => {

    })
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block' 

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
           /*  window.open("http://localhost:4200/dashboard/call","_blank") */
 
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
