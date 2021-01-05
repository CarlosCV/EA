import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../../services/registration/registration.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model = {
    email: "",
    name: "",
    lastName: "",
    prefix: "",
    cellphone: "",
    password: "".trim(),
    role: "ROLE_STUDENT"
  }
  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  registrarUser() {
    this.registrationService.createUser(this.model).subscribe(data => {
      if (data.statusText === "OK") {
        this.router.navigate(['/login']);
      }else{
        alert("Este correo ya esta registrado")
      }
    })
  }

}
