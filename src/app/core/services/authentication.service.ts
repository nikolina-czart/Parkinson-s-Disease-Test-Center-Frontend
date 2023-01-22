import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserRegisterForm} from "../../models/user/user-register-form";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public firebaseAuth: AngularFireAuth) {
  }

  // Sign up with email/password
  register(userRegisterForm: UserRegisterForm):Promise<void> {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(userRegisterForm.email, userRegisterForm.password)
      .then(async (result) => {
        window.alert('You have been successfully registered!');
        const value = await result.user?.getIdToken();
        console.log(value);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
