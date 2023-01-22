import { Injectable } from '@angular/core';

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
}
