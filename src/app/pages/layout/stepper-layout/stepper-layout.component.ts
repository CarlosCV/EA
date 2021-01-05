import { Component, OnInit ,ChangeDetectionStrategy,ViewChild} from '@angular/core';
import { SteperRouterService } from '../../../services/student/steper-router.service'
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-stepper-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stepper-layout.component.html',
  styleUrls: ['./stepper-layout.component.css']
})
export class StepperLayoutComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  completed = false;
  isEditable = false;
  linear=true;
  step1=false
  step2=false
  step3=false
  step4=false
  constructor(
    private steperRouterService:SteperRouterService
  ) { } 

  ngOnInit() {
    this.linear=false
    setTimeout(()=>{
      if(localStorage.getItem("stepName")){
        let stepName= localStorage.getItem("stepName")
        if(stepName === "stepEvaluacion"){
          this.step1=true
        }else if(stepName === "stepNextCurso"){
          this.step1=true;
          this.step2=true
        }else if(stepName === "stepNextHorario"){
          this.step1=true;
          this.step2=true;
          this.step3=true;
        }
        document.getElementById(stepName).click()
      }
     /*  this.stepper.selectedIndex = 1;  */
    },0);
    setTimeout(() => {
      this.linear=true
    }, 500);
    this.steperRouterService.NextStepClick.subscribe(name=>{
      if(name){
          this.stepper.selected.completed = true;
          document.getElementById(name).click()
          localStorage.setItem("stepName",name)
      }
    })
  }

}
