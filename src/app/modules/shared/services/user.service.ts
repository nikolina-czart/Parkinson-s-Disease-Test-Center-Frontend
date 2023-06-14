import {Injectable} from '@angular/core';
import {UserRegisterForm} from "../../../models/user/shared/user-register-form";
import {catchError, from, map, Observable, of, switchMap, tap} from "rxjs";
import {UserLoginForm} from "../../../models/user/shared/user-login";
import {UserDetails} from "../../../models/user/shared/user-model";
import {ErrorService} from "../../../services/error.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import firebase from "firebase/compat";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TestModelFirebase} from "../../../models/tests/test-model-firebase";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userCredential!: UserCredential;
  private newUserUid!: string | undefined;
  constructor(private readonly errorService: ErrorService,
              private readonly firebaseAuth: AngularFireAuth,
              private readonly httpClient: HttpClient,
              private readonly router: Router,
              private readonly authService: AuthenticationService,
              private _snackBar: MatSnackBar) {
  }

  register(userRegisterForm: UserRegisterForm): Observable<string> {
    return from(this.firebaseAuth
      .createUserWithEmailAndPassword(userRegisterForm.email, userRegisterForm.password)).pipe(
      tap(userCredential => {
        this._userCredential = userCredential;
      }),
      switchMap(userCredential => from(userCredential.user?.getIdToken() || of(""))),
      tap(token => {
        this.authService.setToken(token)
      }),
      map(() => this._userCredential),
      switchMap(userCredential => this.createUserInDatabase(userRegisterForm, userCredential.user?.uid)),
      tap(() => {
        this.router.navigateByUrl('/browser-patient')
      }),
      catchError((err: Error) => {
        this.createSnackBar(this.errorService.getErrorMessage(err));
        this.router.navigateByUrl('/register')
        return of(err.message)
      })
    )
  }

  addDoctor(userRegisterForm: UserRegisterForm): Observable<string> {
    return from(this.firebaseAuth
      .createUserWithEmailAndPassword(userRegisterForm.email, userRegisterForm.password)).pipe(
      tap(userCredential => {
        this._userCredential = userCredential;
      }),
      map(() => this._userCredential),
      switchMap(userCredential => this.createUserInDatabase(userRegisterForm, userCredential.user?.uid)),
      tap(() => {
        this.router.navigateByUrl('/browser-doctors')
      }),
      catchError((err: Error) => {
        this.createSnackBar(this.errorService.getErrorMessage(err));
        return of(err.message)
      })
    )
  }

  login(userLoginForm: UserLoginForm): Observable<string> {
    return from(this.firebaseAuth
      .signInWithEmailAndPassword(userLoginForm.email, userLoginForm.password)).pipe(
      tap(userCredential => {
        this._userCredential = userCredential;
      }),
      switchMap(userCredential => from(userCredential.user?.getIdToken() || of(""))),
      tap(token => {
        this.authService.setToken(token)
      }),
      tap(a => {
        this.router.navigateByUrl('/browser-patient')
      }),
      catchError((err) => {
        this.createSnackBar(this.errorService.getErrorMessage(err));
        this.router.navigateByUrl('/login')
        return of(err.message)
      })
    )
  }

  addNewPatient(userRegisterForm: UserRegisterForm, selectedTests: TestModelFirebase[]): Observable<string>  {
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

  getUserDetails(): Observable<UserDetails> {
    const userId = this.authService.decodedToken.userId;
    return this.httpClient.get<UserDetails>(`/api/user/${userId}`, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  private createUserInDatabase(userRegisterForm: UserRegisterForm, uid?: string): Observable<string> {
    userRegisterForm.uid = uid!;
    return this.httpClient.post(`/api/user/save/${uid}`, userRegisterForm, {responseType: 'text'})
  }

  private addTestToPatient(selectedTests: TestModelFirebase[], uid?: string): Observable<string> {
    return this.httpClient.post(`/api/patient-tests/save/${uid}`, selectedTests, {responseType: 'text'})
  }

  createSnackBar(message: string) {
    this._snackBar.open(message, "X",{
      duration: 5000,
    });
  }
}
