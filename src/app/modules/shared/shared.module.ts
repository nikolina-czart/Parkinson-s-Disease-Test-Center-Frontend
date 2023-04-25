import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {HeaderComponent} from "../../components/header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent,
    HeaderComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatOptionModule,
        MatSelectModule,
        MatSnackBarModule,
        MatMenuModule
    ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
