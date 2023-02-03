import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../../../core/validators/password-match.validator";
import {FormService} from "../../../../core/services/form.service";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {take} from "rxjs";
import {UserLoginForm} from "../../../../models/user/user-login";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  hide = true;
  loginFormGroup = this._formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), passwordMatchValidator('passwordConfirmation', true)]],
  });

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly formService: FormService,
              private readonly authenticationService: AuthenticationService,
              private _snackBar: MatSnackBar) {

  }

  getErrorMessage(formControlName: string): string {
    return this.formService.mapErrorMessages(this.loginFormGroup, formControlName)
  }

  isControlValid(formControlName: string): boolean {
    return this.formService.isControlValid(this.loginFormGroup, formControlName)
  }

  submitForm() {
    if(this.loginFormGroup.valid){
      this.authenticationService.login(this.mapRegisterForm()).pipe(take(1)).subscribe()
    }
  }

  private mapRegisterForm(): UserLoginForm {
    return {
      email: this.loginFormGroup.get('email')?.value || '',
      password: this.loginFormGroup.get('password')?.value || '',
    }
  }
}
