import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/services/authentication.service";
import {Observable, take, tap} from "rxjs";
import {UserDetails} from "../../models/user/user-model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  token$!: Observable<string>;
  user!: UserDetails;
  logoUser!: string;

  constructor(private readonly router: Router,
              private readonly authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.token$ = this.authService.getToken$();
    if(this.token$){
      this.authService.getUserDetails(this.authService.decodedToken.userId).pipe(take(1)).subscribe(user => {
        this.user = user
        this.logoUser = this.user.name.at(0)!.toString() + this.user.surname.at(0)!.toString();
      })
    }
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
