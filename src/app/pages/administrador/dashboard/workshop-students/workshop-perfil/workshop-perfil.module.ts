import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopPerfilRoutingModule } from './workshop-perfil-routing.module';
import { WorkshopPerfilComponent } from './workshop-perfil.component';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {UploadFileModule} from '../../../../reusable/upload-file/upload-file.module'
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
//TRANSLATE
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LanguageModule } from '../../../../reusable/languages/languages.module';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [WorkshopPerfilComponent],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    LanguageModule,
    UploadFileModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    WorkshopPerfilRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class WorkshopPerfilModule { }
