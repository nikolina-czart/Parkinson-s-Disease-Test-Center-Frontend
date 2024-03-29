import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BlankPageComponent} from "./blank-page/blank-page.component";
import {LoginPageComponent} from "./modules/shared/pages/login-page/login-page.component";
import {RegisterPageComponent} from "./modules/shared/pages/register-page/register-page.component";
import {BrowserPatientComponent} from "./modules/doctor/pages/browser-patient/browser-patient.component";
import {PatientResultsComponent} from "./modules/doctor/pages/patient-results/patient-results.component";
import {PatientDetailsComponent} from "./modules/doctor/pages/patient-details/patient-details.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {PatientEditComponent} from "./modules/doctor/pages/patient-edit/patient-edit.component";
import {PatientAnalysisComponent} from "./modules/doctor/pages/patient-analysis/patient-analysis.component";
import {PatientInformationComponent} from "./modules/doctor/pages/patient-information/patient-information.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "browser-patient",
  },
  {
    path: "login",
    component: LoginPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "register",
    component: RegisterPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "browser-patient",
    component: BrowserPatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "browser-patient/:id",
    component: PatientDetailsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "edit",
        component: PatientEditComponent,
      },
      {
        path: "information",
        component: PatientInformationComponent,
      },
      {
        path: "result",
        component: PatientResultsComponent,
      },
      {
        path: "analysis",
        component: PatientAnalysisComponent,
      }
    ]
  },
  {
    path: "404",
    component: BlankPageComponent,
  },
  {
    path: "**",
    redirectTo: "/404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
