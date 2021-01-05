import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EvaluationsRoutingModule } from './evaluations-routing.module';
import { EvaluationsComponent } from './evaluations.component';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import {UploadFileModule} from '../../../reusable/upload-file/upload-file.module'
//TRANSLATE
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { QuestionsComponent } from './questions/questions.component';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
//END TRANSLATE

@NgModule({
  declarations: [EvaluationsComponent, QuestionsComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    EvaluationsRoutingModule,
    FormsModule,
    MatSelectModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule,
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
export class EvaluationsModule { }
