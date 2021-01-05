import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeClassesRoutingModule } from './type-classes-routing.module';
import { TypeClassesComponent } from './type-classes.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [TypeClassesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TypeClassesRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    
  ]
})
export class TypeClassesModule { }
