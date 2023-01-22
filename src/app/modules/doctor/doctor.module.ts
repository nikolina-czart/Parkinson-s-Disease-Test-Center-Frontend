import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserPatientComponent } from './pages/browser-patient/browser-patient.component';
import {HeaderComponent} from "../../components/header/header.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import { PatientResultsComponent } from './pages/patient-results/patient-results.component';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatDividerModule} from "@angular/material/divider";
import {RouterOutlet} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
@NgModule({
  declarations: [
    BrowserPatientComponent,
    PatientResultsComponent,
    PatientDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatDividerModule,
    RouterOutlet,
    MatToolbarModule,
    NoopAnimationsModule
  ],
  exports: [
  ]
})
export class DoctorModule { }
