import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ForgotPasswordService} from '../../../services/forgot-password/forgot-password.service'
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
model ={
  email:"".trim()
}
  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private router:Router
  ) { }

  ngOnInit() {
  }
  restablePassword(){
    this.forgotPasswordService.forgotPassword(this.model).subscribe(data =>{
      if(data.statusText==="OK"){
        alert("Nueva contraseña enviada a su correo")
        this.router.navigate(['/login']);
      }
   
    })
  }

}
