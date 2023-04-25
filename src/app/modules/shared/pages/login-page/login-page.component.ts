import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormService} from "../../../../core/services/form.service";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {take} from "rxjs";
import {UserLoginForm} from "../../../../models/user/shared/user-login";
import {UserService} from "../../services/user.service";
import {loginUserFormGroup} from "../../../../../utils/form-utils";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  hide = true;
  loginFormGroup!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly formService: FormService,
              private readonly authenticationService: AuthenticationService,
              private readonly userService: UserService) {

  }

  ngOnInit(): void {
    this.loginFormGroup = loginUserFormGroup(this._formBuilder);
  }

  getErrorMessage(formControlName: string): string {
    return this.formService.mapErrorMessages(this.loginFormGroup, formControlName)
  }

  isControlValid(formControlName: string): boolean {
    return this.formService.isControlValid(this.loginFormGroup, formControlName)
  }

  submitForm() {
    if(this.loginFormGroup.valid){
      this.userService.login(this.mapRegisterForm()).pipe(take(1)).subscribe(console.log)
    }
  }

  private mapRegisterForm(): UserLoginForm {
    return {
      email: this.loginFormGroup.get('email')?.value || '',
      password: this.loginFormGroup.get('password')?.value || '',
    }
  }
}
