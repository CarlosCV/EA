import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopRegistroRoutingModule } from './workshop-registro-routing.module';
import { WorkshopRegistroComponent } from './workshop-registro.component';
import {UploadFileModule} from '../../../../reusable/upload-file/upload-file.module'
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
//TRANSLATE
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LanguageModule } from '../../../../reusable/languages/languages.module';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  declarations: [WorkshopRegistroComponent],
  imports: [
    CommonModule,
    FormsModule,
    WorkshopRegistroRoutingModule,
    UploadFileModule,
    MatSelectModule,
    MatListModule,
    LanguageModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class WorkshopRegistroModule { }
