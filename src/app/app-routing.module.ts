import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BlankPageComponent} from "./blank-page/blank-page.component";
import {LoginPageComponent} from "./modules/shared/pages/login-page/login-page.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "testowa",
  },
  {
    path: "testowa",
    component: LoginPageComponent,
  },
  // {
  //   path: "signin",
  //   component: SignInPageComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: "register",
  //   component: RegisterPageComponent,
  //   canActivate: [AuthGuard],
  // },
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
