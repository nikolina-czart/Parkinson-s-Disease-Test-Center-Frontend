import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  token$!: Observable<string>;

  constructor(private readonly router: Router,
              private readonly authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.token$ = this.authService.getToken$();
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.router.navigate(['/login'])
  }

  register() {
    this.router.navigate(['/register'])
  }


}
