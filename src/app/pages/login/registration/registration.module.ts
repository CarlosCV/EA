import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';


@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule

  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule { }
