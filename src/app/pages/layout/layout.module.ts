import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicesModule } from '../../services/services.module'
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterOnlyLayoutComponent } from './footer-only-layout/footer-only-layout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageOnlyHeaderComponent } from './page-only-header/header.component'
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageOnlyLayoutComponent } from './page-only-layout/page-only-layout.component';
import { StepperLayoutComponent } from './stepper-layout/stepper-layout.component'
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input'
@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatStepperModule,
    MatInputModule,

    ServicesModule
  ],
  exports: [],
  declarations: [
    MainLayoutComponent,
    FooterOnlyLayoutComponent,
    FooterComponent,
    HeaderComponent,
    PageOnlyHeaderComponent,
    SidebarComponent,
    PageOnlyLayoutComponent,
    StepperLayoutComponent
  ]
})
export class LayoutModule { }