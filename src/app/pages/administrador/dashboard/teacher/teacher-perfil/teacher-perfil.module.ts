//TRANSLATE
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LanguageModule } from '../../../../reusable/languages/languages.module';
import { MatStepperModule } from '@angular/material/stepper';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
//END TRANSLATE
import {UploadFileModule} from '../../../../reusable/upload-file/upload-file.module'
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherPerfilComponent } from './teacher-perfil.component';
import {TeacherPerfilRoutingModule} from './teacher-perfil-routing.module'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {CallendarModule} from '../../../../reusable/calendar/calendar.module'
@NgModule({
  declarations: [TeacherPerfilComponent],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatStepperModule,
    UploadFileModule,
    MatSelectModule,
    MatListModule,
    CommonModule,
    ReactiveFormsModule,
    TeacherPerfilRoutingModule,
    FormsModule,
    CallendarModule,
    LanguageModule
  ]
})
export class TeacherPerfilModule { }
