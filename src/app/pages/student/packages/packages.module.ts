import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesComponent } from './packages.component';


@NgModule({
  declarations: [PackagesComponent],
  imports: [
    CommonModule,
    FormsModule,
    PackagesRoutingModule
  ]
})
export class PackagesModule { }
