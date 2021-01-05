import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficosComponent } from './graficos.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [GraficosComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [ GraficosComponent ],
  entryComponents: [GraficosComponent]
})
export class GraficosModule { }
