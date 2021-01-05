import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomCallComponent } from './zoom-call.component';
import {ZoomCallRoutingModule} from './zoom-call-rounting.module'


@NgModule({
  declarations: [ZoomCallComponent],
 /*  exports: [ ZoomCallComponent ],
  entryComponents: [ZoomCallComponent], */
  imports: [
    CommonModule,
    ZoomCallRoutingModule
  ]
})
export class ZoomCallModule { }
