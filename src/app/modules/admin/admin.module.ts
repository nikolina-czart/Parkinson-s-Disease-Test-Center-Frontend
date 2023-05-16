import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserDoctorsComponent} from './pages/browser-doctors/browser-doctors.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AddDoctorComponent} from './pages/browser-doctors/components/add-doctor/add-doctor.component';
import {MatStepperModule} from "@angular/material/stepper";
import {
  BaseFormComponent
} from './pages/browser-doctors/components/add-doctor/components/base-form/base-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDividerModule} from "@angular/material/divider";
import {RouterOutlet} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {PlotlySharedModule} from "angular-plotly.js";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import { SummaryDoctorComponent } from './pages/browser-doctors/components/add-doctor/components/summary-doctor/summary-doctor.component';

@NgModule({
  declarations: [
    BrowserDoctorsComponent,
    AddDoctorComponent,
    BaseFormComponent,
    SummaryDoctorComponent,
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
    MatExpansionModule,
    MatCardModule
  ]
})
export class AdminModule { }
