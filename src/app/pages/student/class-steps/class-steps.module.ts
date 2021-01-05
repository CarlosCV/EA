import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassStepsRoutingModule } from './class-steps-routing.module';
import { ClassStepsComponent } from './class-steps.component';
import { PackageComponent } from './package/package.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { CoursesComponent } from './courses/courses.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import { BankTranferComponent } from './bank-tranfer/bank-tranfer.component';
/* import {MaterialModule} from '../../../pages/material/material.module' */

@NgModule({
  declarations: [ClassStepsComponent, PackageComponent, EvaluationComponent, CoursesComponent,PaymentMethodComponent, BankTranferComponent],
  imports: [
    CommonModule,
    ClassStepsRoutingModule,
    MatStepperModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClassStepsModule { }
