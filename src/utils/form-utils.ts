import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../app/core/validators/password-match.validator";
import {UserRegisterForm} from "../app/models/user/shared/user-register-form";
import {Role} from "../app/models/user/shared/user-role";

export function createNewUserFormGroup(formBuilder: FormBuilder): FormGroup {
  return formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), passwordMatchValidator('passwordConfirmation', true)]],
    passwordConfirmation: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), passwordMatchValidator('password')]]
  });
}

export function loginUserFormGroup(formBuilder: FormBuilder): FormGroup {
  return formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), passwordMatchValidator('passwordConfirmation', true)]],
  });
}

export function createSelectedPatientFormGroup(formBuilder: FormBuilder): FormGroup {
  return formBuilder.group({
    name: [{value: ''}, Validators.required],
    surname: [{value: ''}, Validators.required],
  });
}

export function mapUserForm(formGroup: FormGroup, userUid: string, doctorUid: string, role: Role, controlGroup: boolean): UserRegisterForm {
  return {
    email: formGroup.get('email')?.value || '',
    name: formGroup.get('name')?.value || '',
    surname: formGroup.get('surname')?.value || '',
    password: formGroup.get('password')?.value || '',
    uid: userUid,
    role: role,
    doctorID: doctorUid,
    controlGroup: controlGroup
  }
}
