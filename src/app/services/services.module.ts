import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentService} from './payment/payment.service'
import {UploadFileService} from './upload-file/upload-file.service'
import {TranslateLabelService} from '../services/labels-translate/translate.service'
import {RegistroTeacherService} from '../services/registro-teacher/registro-teacher.service'
import {RegistrationService} from '../services/registration/registration.service'
import {ForgotPasswordService} from '../services/forgot-password/forgot-password.service'
import {PackageService} from '../services/package/package.service'
import {HeaderService} from '../services/reusable/header.service'
import {SteperRouterService} from './student/steper-router.service'
import {LoginService} from '../services/authentication/login.service'
import {TeacherService} from './administrador/dashboard/teacher.service'
import {PaymentsService} from './administrador/finanzas/payments.service'
import {NewSalesService} from './administrador/finanzas/newSales.service'
import {PrivateStudentService} from './administrador/dashboard/private-student.service'
import {EvaluacionesService} from './administrador/examenes/evaluaciones.service'
import {GeneralService} from './general.service'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    PaymentService,
    UploadFileService,
    TranslateLabelService,
    RegistroTeacherService,
    TeacherService,
    RegistrationService,
    ForgotPasswordService,
    PackageService,
    HeaderService,
    SteperRouterService,
    PaymentsService,
    LoginService,
    NewSalesService,
    GeneralService,
    EvaluacionesService,
    PrivateStudentService
    
    
  ],
})
export class ServicesModule { }
