import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BlankPageComponent} from './blank-page/blank-page.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "./modules/shared/shared.module";
import {AppRoutingModule} from "./app-routing.module";
import {DoctorModule} from "./modules/doctor/doctor.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {JwtTokenInterceptor} from "./core/interceptors/jwt-token.interceptor";
import * as PlotlyJS from 'plotly.js-dist-min';
import {PlotlyModule} from 'angular-plotly.js';
import {LoadingSpinnerInterceptor} from "./core/interceptors/loading-spinner.interceptor";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { RemovePatientComponent } from './modules/doctor/pages/remove-patient/remove-patient.component';
import {MatButtonModule} from "@angular/material/button";

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    BlankPageComponent,
    RemovePatientComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    SharedModule,
    AppRoutingModule,
    DoctorModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    PlotlyModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatButtonModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true
  },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingSpinnerInterceptor, multi: true
    },
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
