import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { UploadFileService } from '../../../services/upload-file/upload-file.service'
import {GeneralService} from '../../../services/general.service'
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  filesData = []
  loadinguUpload: boolean = false
  @Input() nameGroup: string;
  @Input() folder: string;
  @Input() idUser: string;
  @Input() UserRole: string;
  @Input() typeUpload: string = "drag";
  @Input() allowedfiles:  [any]
  @Input() getresourceDTOList : any[] = [];

  @Output() responseData = new EventEmitter<any>();
  constructor(private uploadFileService: UploadFileService,
    private generalService: GeneralService) { }

  ngOnInit(): void {
    if(this.getresourceDTOList.length > 0){
      this.getresourceDTOList.forEach(element => {
        let jsonFile = {
          id: element.id,
          typeUpload: this.typeUpload,
          nameFile: element.field,
          nameGroup: element.name,
          url: element.url
        }
        this.filesData.push(jsonFile)
        this.responseData.emit(this.filesData)
      })
    }
  }
  public files: NgxFileDropEntry[] = [];
  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if(file.size <= 2097152){
          const formData = new FormData()
          let Lisfiles = this.allowedfiles
          let filenamet = file.name.split(".");
          let validatefiletype = Lisfiles.includes(filenamet[filenamet.length - 1].toLowerCase())
          /* let jsonFile = {
            id: "1",
            nameFile: droppedFile.relativePath,
            nameGroup: "cv"
          }
          this.filesData.push(jsonFile) */
          if (validatefiletype) {
            formData.append('resource', file)
            formData.append('resourceType', new Blob([JSON.stringify({
              name: this.nameGroup,
              folder: this.folder,
              field:droppedFile.relativePath
            })], {
              type: "application/json"
            }));
            this.loadinguUpload = true
            this.uploadFileService.uploadFile(formData).then(data => {
              let jsonFile = {};
              data.objetoRespuesta.forEach(element => {
                jsonFile = {
                  id: element.id,
                  typeUpload: this.typeUpload,
                  nameFile: droppedFile.relativePath,
                  nameGroup: element.name,
                  url: element.url
                }
                this.filesData.push(jsonFile)
                this.responseData.emit(this.filesData)
                this.loadinguUpload = false
                //sessionStorage.setItem(element.name , element.id )
              });
            }).catch(err => {

            })
          } else {
            alert("Formato Incorrecto")
          }
        }else{
          alert("El file excede los 2MG")
        }
        });
        
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  deleteFile(index,idFile) {
    if(this.idUser){
      let jsonParam={
        id:this.idUser,
        role:this.UserRole,
        resourceDTO:[{id:idFile}]
      }
      document.getElementById("texLoader"+this.nameGroup+index).style.display="none"
      document.getElementById("loadingDelete"+this.nameGroup+index).style.display="block"
      this.generalService.deleteFile(jsonParam).subscribe(data=>{
        if (data.statusText === "OK") {
          this.filesData.splice(index, 1);
          document.getElementById("loadingDelete"+this.nameGroup+index).style.display="none"
        }else{
          document.getElementById("texLoader"+this.nameGroup+index).style.display="block"
        }
      })
    }else {
      this.filesData.splice(index, 1);
    }
 
  }
  public fileOver(event) {

  }

  public fileLeave(event) {
 
  }


}
