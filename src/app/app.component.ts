import {Component, OnInit} from '@angular/core';
import {TokenService} from "./core/services/token.service";
import {AuthenticationService} from "./core/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Parkinson\'s Test Center';

  constructor(private readonly tokenService: TokenService,
              private readonly authService: AuthenticationService,
              private readonly router: Router) {
  }
  ngOnInit() {
    if(!!this.tokenService.getTokenFormLocalStorage()){
      this.authService.setToken(this.tokenService.getTokenFormLocalStorage());
      this.router.navigateByUrl("/browser-patient")
    }
  }
}
