import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserPatientComponent} from './pages/browser-patient/browser-patient.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import {PatientResultsComponent} from './pages/patient-results/patient-results.component';
import {PatientDetailsComponent} from './pages/patient-details/patient-details.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatDividerModule} from "@angular/material/divider";
import {RouterOutlet} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";
import { AddNewPatientComponent } from './pages/add-new-patient/add-new-patient.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { PatientAnalysisComponent } from './pages/patient-analysis/patient-analysis.component';
import {PatientEditComponent} from "./pages/patient-edit/patient-edit.component";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {PlotlySharedModule} from "angular-plotly.js";

@NgModule({
  declarations: [
    BrowserPatientComponent,
    PatientResultsComponent,
    PatientDetailsComponent,
    AddNewPatientComponent,
    PatientAnalysisComponent,
    PatientEditComponent
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
    NoopAnimationsModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PlotlySharedModule
  ],
  exports: [
  ]
})
export class DoctorModule { }
