import { Component, OnInit } from '@angular/core';
import { SteperRouterService } from '../../../../services/student/steper-router.service'
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(
    private steperRouterService: SteperRouterService
  ) { }

  ngOnInit(): void {
  }
  nextStep() {
    this.steperRouterService.NextStep('stepNextCurso')
  }
}
