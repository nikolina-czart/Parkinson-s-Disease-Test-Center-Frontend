import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Token} from "../../models/token.model";
import {UserRegisterForm} from "../../models/user/user-register-form";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) {

  }

  registerUser(form :UserRegisterForm) {
    return this.http.post<Token>("/api/register", form);
  }

  // loginUser(): Observable<Token> {
  //   return this.http.post<Token>("/api/signin", form);
  //
  // }

}
