import { Injectable } from '@angular/core';
import {FirebaseErrorService} from "./firebase-error.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private readonly firebaseErrorService: FirebaseErrorService) { }

  getErrorMessage(error: Error){
    console.error("[Auth error]", error)

    if(error.name === "FirebaseError"){
      return this.firebaseErrorService.firebaseAuthMessage(error);
    }
    return "Problem z zalogowaniem skontaktuj się z działem IT."
  }
}
