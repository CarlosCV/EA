import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesComponent } from './languages.component';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [LanguagesComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatListModule
  ],
  exports: [ LanguagesComponent ],
  entryComponents: [LanguagesComponent]
})
export class LanguageModule { }
