import { NgModule } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { CommonModule,registerLocaleData } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
registerLocaleData(localeEs);
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
  ],
  declarations: [
    CalendarComponent
  ],
  exports: [ CalendarComponent ],
  entryComponents: [CalendarComponent]
})
export class CallendarModule { }
