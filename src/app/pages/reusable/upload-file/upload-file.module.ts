import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [UploadFileComponent],
  imports: [
    CommonModule,
    NgxFileDropModule ,
    HttpClientModule,
    FormsModule
  ],
  exports: [ UploadFileComponent ],
  entryComponents: [UploadFileComponent]
})
export class UploadFileModule { }
