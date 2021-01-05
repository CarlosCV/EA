import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.css']
})
export class EvaluationsComponent implements OnInit {

  constructor(
    private router:Router,
  ) { }

  ngOnInit() {
  }
  startExamen(){
    this.router.navigate(['/evaluacion/preguntas']);
  }

}
