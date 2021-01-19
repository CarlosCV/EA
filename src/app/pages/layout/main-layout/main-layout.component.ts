import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateLabelService } from '../../../services/labels-translate/translate.service'
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('target', { static: false }) elementView: ElementRef;
  constructor(
    private translateService: TranslateLabelService,
  ) {

  }
  expanded: boolean = false;
  ngOnInit() {
    this.translateService.changeExpanded.subscribe(data => {
      this.expanded = data
    })
       
    /*   
      setTimeout(() => {
        let alto= this.elementView.nativeElement.offsetHeight ;
        document.getElementById("m-content-page").style.height=`${alto}px`
     }, 1000/60);
    */
  }
  siderbarView() {

    /*  this.responseData.emit(this.expanded) */
    this.translateService.eventSiderbarView(false)
  }


}
