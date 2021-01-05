import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateLabelService } from '../../../services/labels-translate/translate.service'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() responseData = new EventEmitter<any>();
  expanded: boolean = false;
  expanded2: boolean = false;
  active = {
    dashboard: true,
    finanzas: false,
    examenes: false,
    talleres: false
  }
  constructor(
    private translateLabelService: TranslateLabelService
  ) {

  }

  ngOnInit() {
    this.translateLabelService.changeSiderbar.subscribe(data => {
      this.expanded2 = data
    })
  }
  menuClickExpand() {
    /*  this.responseData.emit(this.expanded) */
    this.translateLabelService.eventExpanded(this.expanded)
  }
  activePage(page) {
    switch (page) {
      case 0:
        this.active.dashboard = true
        this.active.finanzas = false
        this.active.examenes = false
        this.active.talleres = false
        break
      case 1:
        this.active.dashboard = false
        this.active.finanzas = true
        this.active.examenes = false
        this.active.talleres = false
        break
      case 2:
        this.active.dashboard = false
        this.active.finanzas = false
        this.active.examenes = true
        this.active.talleres = false
        break
      case 3:
        this.active.dashboard = false
        this.active.finanzas = false
        this.active.examenes = false
        this.active.talleres = true
        break
    }
  }

}
