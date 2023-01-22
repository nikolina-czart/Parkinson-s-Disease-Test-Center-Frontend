import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../../../core/validators/password-match.validator";
import {FormService} from "../../../../core/services/form.service";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {UserRegisterForm} from "../../../../models/user/user-register-form";
import {Role} from "../../../../models/user/user-role";
import {Test} from "../../../../models/tests/test";
import {Gyroscope} from "../../../../models/tests/gyroscope";
import {FingerTapping} from "../../../../models/tests/finger-tapping";
import {Static} from "../../../../models/tests/static";
import {ToeTapping} from "../../../../models/tests/toe-tapping";
import {Voice} from "../../../../models/tests/voice";

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.scss']
})
export class AddNewPatientComponent {
  hidePassword = true;
  hidePasswordConfirmation= true;
  registerPatientFormGroup = this._formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), passwordMatchValidator('passwordConfirmation', true)]],
    passwordConfirmation: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), passwordMatchValidator('password')]]
  });

  allTest = [
    {
      test: new Gyroscope(),
      completed: false
    },
    {
      test: new FingerTapping(),
      completed: false
    },
    {
      test: new Static(),
      completed: false
    },
    {
      test: new ToeTapping(),
      completed: false
    },
    {
      test: new Voice(),
      completed: false
    },
  ];

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly formService: FormService) {

  }

  getErrorMessage(formControlName: string): string {
    return this.formService.mapErrorMessages(this.registerPatientFormGroup, formControlName)
  }

  isControlValid(formControlName: string): boolean {
    return this.formService.isControlValid(this.registerPatientFormGroup, formControlName)
  }
  submitForm() {
    console.log("Dodaj nowego użytkownika")
  }

  private mapRegisterForm(): UserRegisterForm {
    return {
      email: this.registerPatientFormGroup.get('email')?.value || '',
      name: this.registerPatientFormGroup.get('name')?.value || '',
      surname: this.registerPatientFormGroup.get('surname')?.value || '',
      password: this.registerPatientFormGroup.get('password')?.value || '',
      uid: "",
      role: Role.DOCTOR,
      doctorID: ""
    }
  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.allTest != null && this.allTest.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.allTest == null) {
      return false;
    }
    return this.allTest.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.allTest == null) {
      return;
    }
    this.allTest.forEach(t => (t.completed = completed));
  }
}