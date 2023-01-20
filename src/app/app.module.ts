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
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
