import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {TokenService} from "./token.service";
import {DecodedToken} from "../../models/token.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _decodedToken!: DecodedToken;
  private _jwtToken!: string;
  private _jwtTokenSubj$ = new BehaviorSubject<string>("")
  private _jwtToken$ = this._jwtTokenSubj$.asObservable();

  constructor(private readonly router: Router,
              private readonly tokenService: TokenService) {
  }

  logout(){
    this.tokenService.removeTokenFromLocalStorage();
    this._jwtToken = null as any;
    this._jwtTokenSubj$.next(null as any);
    this.router.navigateByUrl("/login");
  }

  public getToken$(): Observable<string> {
    return this._jwtToken$;
  }

  public setToken(token: string): void {
    console.log(token)
    this.tokenService.saveTokenToLocalStorage(token);
    this._jwtToken = token;
    this.setDecodedToken(token);
    this._jwtTokenSubj$.next(token);
  }
  get token(): string {
    return this._jwtToken;
  }
  get decodedToken(): DecodedToken {
    return this._decodedToken;
  }

  public setDecodedToken(token: string): void {
    this._decodedToken = this.tokenService.decodeToken(token);
  }
}
