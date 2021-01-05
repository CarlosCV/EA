import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroTeacherRoutingModule } from './registro-teacher-routing.module';
import { RegistroTeacherComponent } from './registro-teacher.component';
import {UploadFileModule} from '../../reusable/upload-file/upload-file.module'
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  declarations: [RegistroTeacherComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RegistroTeacherRoutingModule,
    UploadFileModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class RegistroTeacherModule { }
