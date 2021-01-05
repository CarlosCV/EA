import { Component, OnInit } from '@angular/core';
import { SteperRouterService } from '../../../services/student/steper-router.service'
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(
    private steperRouterService: SteperRouterService
  ) { }

  ngOnInit(): void {
  }
  nextStep() {
    this.steperRouterService.NextStep("stepNextHorario")
  }

}
