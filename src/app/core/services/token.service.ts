import { Injectable } from '@angular/core';
import {DecodedToken, Token} from "../../models/token.model";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getTokenFormLocalStorage(): string {
    return localStorage.getItem("jwt") || "";
  }

  saveTokenToLocalStorage(token: string): void {
    return localStorage.setItem("jwt", token)
  }

  removeTokenFromLocalStorage(): void {
    localStorage.removeItem("jwt");
  }

  decodeToken(token: string): DecodedToken {
    const t = jwtDecode(token) as any;

    const decodedToken: DecodedToken = {
      userId: t.user_id,
      exp: t.exp,
      iat: t.orig_iat,
    };

    return decodedToken;
  }
}
