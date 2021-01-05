import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GeneralService } from '../../../services/general.service'
@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  levels: any[]
  levelsTemporal: any[]
  idiomas:any
  @Output() responseData = new EventEmitter<any>();
  constructor(
    private generalService: GeneralService
  ) {

  }
  json: any;
  ngOnInit() {
    this.json = [
      { name: "English", id: 1 },
      { name: "Spanish", id: 7 },
    ]
    this.generalService.allLanguages().subscribe(data => {
      if (data.statusText == "OK") {
       /*  data.objetoRespuesta.forEach(elementData => {
          this.json.forEach(elementItem => {
            if (elementData.id == elementItem.id) {
              elementData["selected"] = true
            }
          });
        }); */
        this.levelsTemporal = data.objetoRespuesta;
        var hash = {};
        data.objetoRespuesta = data.objetoRespuesta.filter(function (current) {
          var exists = !hash[current.name];
          hash[current.name] = true;
          return exists;
        });
        this.idiomas = data.objetoRespuesta
    /*  let array=[]
        let json
        data.objetoRespuesta.forEach(element => {
           json ={
             name : element.name,
             children:this.levelsTemporal.filter(x => x.name == element.name)
           }
           array.push(json)
        });
        this.idiomas =array
    */



      }
    })
  }
  OpenLevel(getName) {
    this.levels = this.levelsTemporal.filter(x => x.name == getName)
  }
  getLanguage(id) {
    this.responseData.emit(id)
  }
}
