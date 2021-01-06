import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterOnlyLayoutComponent } from './footer-only-layout/footer-only-layout.component';
import { PageOnlyLayoutComponent } from './page-only-layout/page-only-layout.component'
import { StepperLayoutComponent } from './stepper-layout/stepper-layout.component'
import { AuthGuard } from '../login/guards/auth.guards';
import { Role } from '../login/guards/Role'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
 /*  {
    path: '**',
    redirectTo: 'not-found'
  }, */
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      //DASHBOARD
      { path: 'profile', loadChildren: () => import('../administrador/admin-perfil/admin-perfil.module').then(m => m.AdminPerfilModule), canActivate: [AuthGuard], data: { roles: [Role.student,Role.admin] } },
      { path: 'notifications', loadChildren: () => import('../administrador/notifications/notifications.module').then(m => m.NotificationsModule), canActivate: [AuthGuard], data: { roles: [Role.student,Role.admin] } },
      { path: 'chat', loadChildren: () => import('../administrador/chat/chat.module').then(m => m.ChatModule), canActivate: [AuthGuard], data: { roles: [Role.student,Role.admin] } },
      { path: 'teacher', loadChildren: () => import('../administrador/dashboard/teacher/teacher.module').then(m => m.TeacherModule), canActivate: [AuthGuard], data: { roles: [Role.student,Role.admin] } },
      { path: 'teacher/view', loadChildren: () => import('../administrador/dashboard/teacher/teacher-view/teacher-view.module').then(m => m.TeacherViewModule), canActivate: [AuthGuard], data: {  roles: [Role.student,Role.admin] } },
      { path: 'teacher/profile/:param', loadChildren: () => import('../administrador/dashboard/teacher/teacher-perfil/teacher-perfil.module').then(m => m.TeacherPerfilModule), canActivate: [AuthGuard], data: {  roles: [Role.student,Role.admin] } },
      { path: 'teacher/add', loadChildren: () => import('../administrador/dashboard/teacher/teacher-registro/teacher-registro.module').then(m => m.TeacherRegistroModule), canActivate: [AuthGuard], data: {  roles: [Role.student,Role.admin] } },
      { path: 'private-student', loadChildren: () => import('../administrador/dashboard/private-students/private-students.module').then(m => m.PrivateStudentsModule), canActivate: [AuthGuard], data: { roles: [Role.student,Role.admin] } },
      { path: 'private-student/view', loadChildren: () => import('../administrador/dashboard/private-students/student-view/student-view.module').then(m => m.StudentViewModule), canActivate: [AuthGuard], data: { roles: [Role.student,Role.admin] } },
      { path: 'private-student/profile/:param', loadChildren: () => import('../administrador/dashboard/private-students/student-perfil/student-perfil.module').then(m => m.StudentPerfilModule), canActivate: [AuthGuard], data: { roles: [Role.student,Role.admin] } },
      { path: 'private-student/add', loadChildren: () => import('../administrador/dashboard/private-students/student-registro/student-registro.module').then(m => m.StudentRegistroModule), canActivate: [AuthGuard], data: { roles: [Role.student,Role.admin] } },
      //FINANZAS
      { path: 'sales', loadChildren: () => import('../administrador/finanzas/new-sales/new-sales.module').then(m => m.NewSalesModule), canActivate: [AuthGuard], data: {  roles: [Role.student,Role.admin] } },
      { path: 'payments', loadChildren: () => import('../administrador/finanzas/payments/payments.module').then(m => m.PaymentsModule), canActivate: [AuthGuard], data: {  roles: [Role.student,Role.admin] } },
      { path: 'payments/student', loadChildren: () => import('../administrador/finanzas/payments/student-list/student-list.module').then(m => m.StudentListModule), canActivate: [AuthGuard], data: {  roles: [Role.student,Role.admin] } },
      //EXAMENES
      { path: 'evaluations', loadChildren: () => import('../administrador/examenes/evaluations/evaluations.module').then(m => m.EvaluationsModule), canActivate: [AuthGuard], data: {  roles: [Role.student,Role.admin] } },
      //TALLERES
      { path: 'workshop-student', loadChildren: () => import('../administrador/dashboard/workshop-students/workshop-students.module').then(m => m.WorkshopStudentsModule), canActivate: [AuthGuard], data: { roles: [Role.student,Role.admin] } },
      { path: 'workshop-student/add', loadChildren: () => import('../administrador/dashboard/workshop-students/workshop-registro/workshop-registro.module').then(m => m.WorkshopRegistroModule), canActivate: [AuthGuard], data: { roles: [Role.student,Role.admin] } },
      { path: 'workshop-student/profile/:param', loadChildren: () => import('../administrador/dashboard/workshop-students/workshop-perfil/workshop-perfil.module').then(m => m.WorkshopPerfilModule), canActivate: [AuthGuard], data: { roles: [Role.student,Role.admin] } },
    ]
  },

  {
    path: '',
    component: FooterOnlyLayoutComponent,
    children: [
      { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
      { path: 'registrate', loadChildren: () => import('../login/registration/registration.module').then(m => m.RegistrationModule) },
      { path: 'forgot-password', loadChildren: () => import('../login/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
      { path: 'call', loadChildren: () => import('../reusable/zoom-call/zoom-call.module').then(m => m.ZoomCallModule) },
      { path: 'not-found', loadChildren: () => import('../not-found/not-found.module').then(m => m.NotFoundModule) },
    ]
  },
  {
    path: '',
    component: PageOnlyLayoutComponent,
    children: [
      { path: 'registro-profesor', loadChildren: () => import('../teacher/registro-teacher/registro-teacher.module').then(m => m.RegistroTeacherModule) },
      { path: 'type-classes', loadChildren: () => import('../student/type-classes/type-classes.module').then(m => m.TypeClassesModule) },
    ]
  },
  {
    path: '',
    component: StepperLayoutComponent,
    children: [
      /*  { path: 'paquetes', loadChildren: () => import('../student/class-steps/class-steps.module').then(m => m.ClassStepsModule) }, */
      { path: 'paquetes', loadChildren: () => import('../student/packages/packages.module').then(m => m.PackagesModule) },
      { path: 'metodo-pago', loadChildren: () => import('../student/payment-method/payment-method.module').then(m => m.PaymentMethodModule) },
      { path: 'executePayment', loadChildren: () => import('../student/payment-method/payment-success/payment-success.module').then(m => m.PaymentSuccessModule) },
      { path: 'cancelPayment', loadChildren: () => import('../student/payment-method/payment-cancel/payment-cancel.module').then(m => m.PaymentCancelModule) },
      { path: 'transferencia', loadChildren: () => import('../student/bank-transfer/bank-transfer.module').then(m => m.BankTransferModule) },
      { path: 'evaluacion', loadChildren: () => import('../student/evaluations/evaluations.module').then(m => m.EvaluationsModule) },
      { path: 'evaluacion/preguntas', loadChildren: () => import('../student/evaluations/questions/questions.module').then(m => m.QuestionsModule) },
      { path: 'evaluacion/resultado', loadChildren: () => import('../student/evaluations/result/result.module').then(m => m.ResultModule) },
      { path: 'curso', loadChildren: () => import('../student/courses/courses.module').then(m => m.CoursesModule) },
      { path: 'horario', loadChildren: () => import('../student/schedule/schedule.module').then(m => m.ScheduleModule) },

    ]
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,


    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
