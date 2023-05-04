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
import {PatientDetailsComponent} from './pages/patient-details_remove/patient-details.component';
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
import { PatientAnalysisComponent_remove } from './pages/patient-analysis_remove/patient-analysis-component_remove.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {PlotlySharedModule} from "angular-plotly.js";
import {MatStepperModule} from "@angular/material/stepper";
import { NewPatientBaseFormComponent } from './pages/add-new-patient/components/new-patient-base-form/new-patient-base-form.component';
import { NewPatientTestsCheckedComponent } from './pages/add-new-patient/components/new-patient-tests-checked/new-patient-tests-checked.component';
import { NewPatientSummaryComponent } from './pages/add-new-patient/components/new-patient-summary/new-patient-summary.component';
import { InformationComponent } from './pages/patient-details/information/information.component';
import { BaseInformationComponent } from './pages/patient-details/information/components/base-information/base-information.component';
import { TestsInformationComponent } from './pages/patient-details/information/components/tests-information/tests-information.component';
import { EditPatientComponent } from './pages/patient-details/information/edit-patient/edit-patient.component';
import { RemovePatientComponent } from './pages/patient-details/information/remove-patient/remove-patient.component';
import {PatientAnalysisComponent} from "./pages/patient-details/analysis/patient-analysis/patient-analysis.component";
import {MatExpansionModule} from "@angular/material/expansion";
import { AnalysisFingerTappingComponent } from './pages/patient-details/analysis/patient-analysis/analysis-finger-tapping/analysis-finger-tapping.component';
import { AnalysisGyroscopeComponent } from './pages/patient-details/analysis/patient-analysis/analysis-gyroscope/analysis-gyroscope.component';
import { DataTabelComponent } from './pages/patient-details/analysis/patient-analysis/analysis-finger-tapping/components/data-tabel/data-tabel.component';
import { HistogramComponent } from './pages/patient-details/analysis/patient-analysis/analysis-finger-tapping/components/histogram/histogram.component';
import { BoxPlotComponent } from './pages/patient-details/analysis/patient-analysis/analysis-finger-tapping/components/box-plot/box-plot.component';
import { DensityComponent } from './pages/patient-details/analysis/patient-analysis/analysis-finger-tapping/components/density/density.component';
import { ViolinComponent } from './pages/patient-details/analysis/patient-analysis/analysis-finger-tapping/components/violin/violin.component';
import { MeanPlotComponent } from './pages/patient-details/analysis/patient-analysis/analysis-finger-tapping/components/mean-plot/mean-plot.component';
import { MeanTremorByDayComponent } from './pages/patient-details/analysis/patient-analysis/analysis-gyroscope/components/mean-tremor-by-day/mean-tremor-by-day.component';

@NgModule({
  declarations: [
    BrowserPatientComponent,
    PatientResultsComponent,
    PatientDetailsComponent,
    AddNewPatientComponent,
    PatientAnalysisComponent_remove,
    NewPatientBaseFormComponent,
    NewPatientTestsCheckedComponent,
    NewPatientSummaryComponent,
    InformationComponent,
    BaseInformationComponent,
    TestsInformationComponent,
    EditPatientComponent,
    RemovePatientComponent,
    PatientAnalysisComponent,
    AnalysisFingerTappingComponent,
    AnalysisGyroscopeComponent,
    DataTabelComponent,
    HistogramComponent,
    BoxPlotComponent,
    DensityComponent,
    ViolinComponent,
    MeanPlotComponent,
    MeanTremorByDayComponent
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
    MatStepperModule,
    MatExpansionModule
  ],
  exports: [
  ]
})
export class DoctorModule { }
