import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormService} from "../../../../core/services/form.service";
import {UserRegisterForm} from "../../../../models/user/shared/user-register-form";
import {take} from "rxjs";
import {Role} from "../../../../models/user/shared/user-role";
import {UserService} from "../../services/user.service";
import {createNewUserFormGroup, mapUserForm} from "../../../../../utils/form-utils";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit{
  hidePassword = true;
  hidePasswordConfirmation= true;
  registerFormGroup!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly formService: FormService,
              private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.registerFormGroup = createNewUserFormGroup(this._formBuilder);
  }

  getErrorMessage(formControlName: string): string {
    return this.formService.mapErrorMessages(this.registerFormGroup, formControlName)
  }

  isControlValid(formControlName: string): boolean {
    return this.formService.isControlValid(this.registerFormGroup, formControlName)
  }

  submitForm() {
    if(this.registerFormGroup.valid){
      this.userService.register(mapUserForm(this.registerFormGroup, "", "", Role.DOCTOR, false))
        .pipe(take(1)).subscribe(console.log)
    }
  }
}
