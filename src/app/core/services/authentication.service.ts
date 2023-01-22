import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserRegisterForm} from "../../models/user/user-register-form";
import {BehaviorSubject, catchError, from, map, Observable, of, Subject, switchMap, take, tap} from "rxjs";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserLoginForm} from "../../models/user/user-login";
import {UserDetails} from "../../models/user/user-model";
import {TokenService} from "./token.service";
import {DecodedToken} from "../../models/token.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _decodedToken!: DecodedToken;
  private _jwtToken!: string;

  private _userCredential!: UserCredential;

  private _jwtTokenSubj$ = new BehaviorSubject<string>("")
  private _jwtToken$ = this._jwtTokenSubj$.asObservable()


  constructor(private readonly firebaseAuth: AngularFireAuth,
              private readonly httpClient: HttpClient,
              private readonly router: Router,
              private readonly tokenService: TokenService) {
  }

  register(userRegisterForm: UserRegisterForm): Observable<string> {
    return from(this.firebaseAuth
      .createUserWithEmailAndPassword(userRegisterForm.email, userRegisterForm.password)).pipe(
        tap(userCredential => {
          this._userCredential = userCredential;
        }),
        switchMap(userCredential => from(userCredential.user?.getIdToken() || of(""))),
        tap(token => {
          this.setToken(token)
        }),
        map(() => this._userCredential),
        switchMap(userCredential => this.createUserInDatabase(userRegisterForm, userCredential.user?.uid)),
        tap(() => {
          this.router.navigateByUrl('/browser-patient')
        }),
        catchError((err: Error) => {
          console.error("[Auth error]", err.message)
          this.router.navigateByUrl('/error')
          return of(err.message)
        })
        // switchMap(token => )
      )
  }

  login(userLoginForm: UserLoginForm): Observable<string> {
    return from(this.firebaseAuth
        .signInWithEmailAndPassword(userLoginForm.email, userLoginForm.password)).pipe(
        tap(userCredential => {
          console.log(userCredential)
          this._userCredential = userCredential;
        }),
        switchMap(userCredential => from(userCredential.user?.getIdToken() || of(""))),
        tap(token => {
          this.setToken(token)
        }),
        // map(() => this._userCredential),
        // switchMap(userCredential => this.getUserDetails(userCredential.user?.uid)),
        tap(() => {
          this.router.navigateByUrl('/browser-patient')
        }),
        catchError((err: Error) => {
          console.error("[Auth error]", err.message)
          this.router.navigateByUrl('/error')
          return of(err.message)
        })
      )
  }

  logout(){
    this.tokenService.removeTokenFromLocalStorage();
    this.setToken("");
    this.router.navigateByUrl("/login");
  }

  public getToken$(): Observable<string> {
    return this._jwtToken$;
  }

  private createUserInDatabase(userRegisterForm: UserRegisterForm, uid?: string): Observable<string> {
    userRegisterForm.uid = uid!;
    return this.httpClient.post(`/api/user/save/${uid}`, userRegisterForm, {responseType: 'text'})
  }

  // private getUserDetails(uid: any): Observable<UserDetails> {
  //   return this.httpClient.get(`/api/user/${uid}`)
  // }

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
