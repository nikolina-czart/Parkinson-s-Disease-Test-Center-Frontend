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
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
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
import { PatientInformationComponent } from './pages/patient-information/patient-information.component';
import {MatStepperModule} from "@angular/material/stepper";
import { NewPatientBaseFormComponent } from './pages/add-new-patient/components/new-patient-base-form/new-patient-base-form.component';
import { NewPatientTestsCheckedComponent } from './pages/add-new-patient/components/new-patient-tests-checked/new-patient-tests-checked.component';
import { NewPatientSummaryComponent } from './pages/add-new-patient/components/new-patient-summary/new-patient-summary.component';

@NgModule({
  declarations: [
    BrowserPatientComponent,
    PatientResultsComponent,
    PatientDetailsComponent,
    AddNewPatientComponent,
    PatientAnalysisComponent,
    PatientEditComponent,
    PatientInformationComponent,
    NewPatientBaseFormComponent,
    NewPatientTestsCheckedComponent,
    NewPatientSummaryComponent
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
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        FormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        PlotlySharedModule,
        MatStepperModule
    ],
  exports: [
  ]
})
export class DoctorModule { }
