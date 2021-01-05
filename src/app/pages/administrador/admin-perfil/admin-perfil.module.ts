import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminPerfilRoutingModule } from './admin-perfil-routing.module';
import { AdminPerfilComponent } from './admin-perfil.component';
import {UploadFileModule} from '../../reusable/upload-file/upload-file.module'
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
//TRANSLATE
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LanguageModule } from '../../reusable/languages/languages.module';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
//END TRANSLATE
@NgModule({
  declarations: [AdminPerfilComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPerfilRoutingModule,
    UploadFileModule,
    LanguageModule,
    HttpClientModule,
    MatSelectModule,
    MatListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class AdminPerfilModule { }
