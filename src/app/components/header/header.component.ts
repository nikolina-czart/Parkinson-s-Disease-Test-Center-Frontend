import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Observable, take, tap} from "rxjs";
import {UserDetails} from "../../models/user/shared/user-model";
import {UserService} from "../../modules/shared/services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  token$!: Observable<string>;
  user!: UserDetails | undefined;
  logoUser!: string;

  constructor(private readonly router: Router,
              private readonly authService: AuthenticationService,
              private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.token$ = this.authService.getToken$();
    this.token$.subscribe(token => {
      if(token) {
        this.userService.getUserDetails(this.authService.decodedToken.userId).pipe(take(1)).subscribe(user => {
          this.user = user
          this.logoUser = this.user.name.at(0)!.toString() + this.user.surname.at(0)!.toString();
        })
      }
    })
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

  allPatientInfo() {

  }
}
