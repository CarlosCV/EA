import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { TeacherRegistroRoutingModule } from './teacher-registro-routing.module';
import { TeacherRegistroComponent } from './teacher-registro.component';
import {UploadFileModule} from '../../../../reusable/upload-file/upload-file.module'
import {CallendarModule} from '../../../../reusable/calendar/calendar.module'
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
//TRANSLATE
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LanguageModule } from '../../../../reusable/languages/languages.module';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
//END TRANSLATE
@NgModule({
  declarations: [TeacherRegistroComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LanguageModule,
    UploadFileModule,
    TeacherRegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatListModule,
    MatStepperModule,
    CallendarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    
  ]
})
export class TeacherRegistroModule { }
