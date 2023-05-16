import {AfterContentInit, Component, OnInit} from '@angular/core';
import {TokenService} from "./core/services/token.service";
import {AuthenticationService} from "./core/services/authentication.service";
import {Router} from "@angular/router";
import {LoadingSpinnerService} from "./core/services/loading-spinner.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit{
  title = 'Parkinson\'s Test Center';
  isLoading$!: Observable<boolean>;
  constructor(private readonly tokenService: TokenService,
              private readonly authService: AuthenticationService,
              private readonly router: Router,
              private readonly loadingService: LoadingSpinnerService) {

  }
  ngOnInit() {
    if(!!this.tokenService.getTokenFormLocalStorage()){
      this.authService.setToken(this.tokenService.getTokenFormLocalStorage());
      this.router.navigateByUrl("/browser-patient")
    }else {
      this.router.navigateByUrl("/login")
    }
  }

  ngAfterContentInit() {
    this.isLoading$ = this.loadingService.shouldDisplay$;
  }
}
