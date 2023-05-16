import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Observable, take} from "rxjs";
import {UserDetails} from "../../models/user/shared/user-model";
import {UserService} from "../../modules/shared/services/user.service";
import {Role} from "../../models/user/shared/user-role";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  token$!: Observable<string>;
  user!: UserDetails | undefined;
  logoUser!: string;
  isAdmin = false;

  constructor(private readonly router: Router,
              private readonly authService: AuthenticationService,
              private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.token$ = this.authService.getToken$();
    this.token$.subscribe(token => {
      if(token) {
        this.userService.getUserDetails().pipe(take(1)).subscribe(user => {
          this.user = user
          if(this.user.role === Role.DOCTOR) {
            this.logoUser = this.user.name.at(0)!.toString() + this.user.surname.at(0)!.toString();
          }else if (this.user.role === Role.ADMIN) {
            this.isAdmin = true;
          }
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
    this.router.navigate(['/patients'])
  }

  goToBrowserPatient() {
    this.router.navigate(['/browser-patient'])
  }
}
