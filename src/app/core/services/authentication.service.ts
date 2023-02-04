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
import {Test} from "../../models/tests/test";
import {TestType} from "../../models/tests/test-type";
import {TestName} from "../../models/tests/test-name";
import {TestNameEng} from "../../models/tests/test-name-en";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FirebaseErrorService} from "../../services/firebase-error.service";
import {ErrorService} from "../../services/error.service";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _decodedToken!: DecodedToken;
  private _jwtToken!: string;
  private _userCredential!: UserCredential;
  private _jwtTokenSubj$ = new BehaviorSubject<string>("")
  private _jwtToken$ = this._jwtTokenSubj$.asObservable();
  private newUserUid!: string | undefined;

  constructor(private readonly firebaseAuth: AngularFireAuth,
              private readonly httpClient: HttpClient,
              private readonly router: Router,
              private readonly tokenService: TokenService,
              private _snackBar: MatSnackBar,
              private readonly errorService: ErrorService,
              private readonly dialog: MatDialog) {
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
          this._snackBar.open(this.errorService.getErrorMessage(err), "X",{
            duration: 5000,
          });
          this.router.navigateByUrl('/register')
          return of(err.message)
        })
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
        tap(() => {
          this.router.navigateByUrl('/browser-patient')
        }),
        catchError((err) => {
          this._snackBar.open(this.errorService.getErrorMessage(err), "X",{
            duration: 5000,
          });          this.router.navigateByUrl('/login')
          return of(err.message)
        })
      )
  }

  logout(){
    this.tokenService.removeTokenFromLocalStorage();
    this._jwtToken = null as any;
    this._jwtTokenSubj$.next(null as any);
    this.router.navigateByUrl("/login");
  }

  addNewPatient(userRegisterForm: UserRegisterForm, selectedTests: { uid: TestType; name: TestNameEng }[]): Observable<string>  {
    return from(this.firebaseAuth
      .createUserWithEmailAndPassword(userRegisterForm.email, userRegisterForm.password)).pipe(
      tap(userCredential => {
        this._userCredential = userCredential;
        this.newUserUid = userCredential.user?.uid;
      }),
      map(() => this._userCredential),
      switchMap(userCredential => this.createUserInDatabase(userRegisterForm, userCredential.user?.uid)),
      map(() => this._userCredential),
      switchMap(userCredential => this.addTestToPatient(selectedTests, userCredential.user?.uid)),
      tap(() => {
        this._snackBar.open("Dodano nowego pacjenta", "X",{
          duration: 5000,
        });
        this.router.navigateByUrl('/browser-patient')
      }),
      catchError((err: Error) => {
        this._snackBar.open(this.errorService.getErrorMessage(err), "X",{
          duration: 5000,
        });
        return of("")
      })
    )
  }

  public getToken$(): Observable<string> {
    return this._jwtToken$;
  }

  private createUserInDatabase(userRegisterForm: UserRegisterForm, uid?: string): Observable<string> {
    userRegisterForm.uid = uid!;
    return this.httpClient.post(`/api/user/save/${uid}`, userRegisterForm, {responseType: 'text'})
  }

  getUserDetails(uid: any): Observable<UserDetails> {
    return this.httpClient.get<UserDetails>(`/api/user/${uid}`);
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

  private addTestToPatient(selectedTests: { uid: TestType; name: TestNameEng }[], uid?: string): Observable<string> {
    return this.httpClient.post(`/api/tests/save/${uid}`, selectedTests, {responseType: 'text'})
  }
}
