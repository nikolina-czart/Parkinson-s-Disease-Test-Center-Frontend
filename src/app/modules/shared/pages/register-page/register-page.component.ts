import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FormService} from "../../../../core/services/form.service";
import {passwordMatchValidator} from "../../../../core/validators/password-match.validator";
import {UserRegisterForm} from "../../../../models/user/user-register-form";
import {take} from "rxjs";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {Role} from "../../../../models/user/user-role";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  hidePassword = true;
  hidePasswordConfirmation= true;
  registerFormGroup = this._formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), passwordMatchValidator('passwordConfirmation', true)]],
    passwordConfirmation: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), passwordMatchValidator('password')]]
  });

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly formService: FormService,
              private readonly authenticationService: AuthenticationService) {

  }

  getErrorMessage(formControlName: string): string {
    return this.formService.mapErrorMessages(this.registerFormGroup, formControlName)
  }

  isControlValid(formControlName: string): boolean {
    return this.formService.isControlValid(this.registerFormGroup, formControlName)
  }

  submitForm() {
    if(this.registerFormGroup.valid){
      console.log(this.registerFormGroup.controls)
      this.authenticationService.register(this.mapRegisterForm()).pipe(take(1)).subscribe(console.log)
    }else {
      console.log("nie działa")
    }
  }

  private mapRegisterForm(): UserRegisterForm {
    return {
      email: this.registerFormGroup.get('email')?.value || '',
      name: this.registerFormGroup.get('name')?.value || '',
      surname: this.registerFormGroup.get('surname')?.value || '',
      password: this.registerFormGroup.get('password')?.value || '',
      uid : "",
      role: Role.DOCTOR,
      doctorID: ""
    }
  }
}
