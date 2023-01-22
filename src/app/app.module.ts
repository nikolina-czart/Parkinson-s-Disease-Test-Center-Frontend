import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { HeaderComponent } from './components/header/header.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {SharedModule} from "./modules/shared/shared.module";
import {AppRoutingModule} from "./app-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {DoctorModule} from "./modules/doctor/doctor.module";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {JwtTokenInterceptor} from "./core/interceptors/jwt-token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    BlankPageComponent,
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
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true
  }],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
