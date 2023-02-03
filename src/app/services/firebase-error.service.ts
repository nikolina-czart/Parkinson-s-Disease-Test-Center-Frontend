import {Injectable} from '@angular/core';
import {FirebaseErrorCode} from "../models/firebaseErrorCode";
import {FirebaseErrorMessage} from "../models/firebaseErrorMessage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }


  firebaseAuthMessage(error: Error): string {
    const errorCode = this.getErrorCode(error.message);
    console.log(errorCode)
    console.log(FirebaseErrorCode.TOO_MANY_REQUEST)
    console.log(errorCode === FirebaseErrorCode.TOO_MANY_REQUEST)
    switch (errorCode) {
      case FirebaseErrorCode.USER_NOT_FOUND:
        return FirebaseErrorMessage.USER_NOT_FOUND;
      case FirebaseErrorCode.EMAIL_ALREADY_EXISTS:
        return FirebaseErrorMessage.EMAIL_ALREADY_EXISTS;
      case FirebaseErrorCode.WRONG_PASSWORD:
        return FirebaseErrorMessage.WRONG_PASSWORD;
      case FirebaseErrorCode.UID_ALREADY_EXISTS:
        return FirebaseErrorMessage.UID_ALREADY_EXISTS;
      case FirebaseErrorCode.TOO_MANY_REQUEST:
        return FirebaseErrorMessage.TOO_MANY_REQUEST;
      case FirebaseErrorCode.EMAIL_ALREADY_IN_USE:
        return FirebaseErrorMessage.EMAIL_ALREADY_IN_USE;
    }
    return "Problem z zalogowaniem skontaktuj się z działem IT."
  }

  private getErrorCode(message: string): string{
    return message.split(".").at(-2)!.toString().trim()
      .replace("(", "").replace(")", "")
  }
}
