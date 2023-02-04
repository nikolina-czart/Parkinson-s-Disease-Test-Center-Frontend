import {Component, OnInit} from '@angular/core';
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
import {take} from "rxjs";
import {DoctorService} from "../../services/doctor.service";
import {TestRequest} from "@angular/common/http/testing";
import {TestType} from "../../../../models/tests/test-type";
import {TestName} from "../../../../models/tests/test-name";
import {MatDialogRef} from "@angular/material/dialog";
import {TestNameEng} from "../../../../models/tests/test-name-en";
import {Patient} from "../../../../models/user/patient";
import {T} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.scss']
})
export class AddNewPatientComponent implements OnInit{
  hidePassword = true;
  hidePasswordConfirmation= true;
  newPatientFormGroup = this._formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), passwordMatchValidator('passwordConfirmation', true)]],
    passwordConfirmation: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), passwordMatchValidator('password')]]
  });

  selectedTests: Test[] = []

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
  private userID!: string;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly formService: FormService,
              private readonly authService: AuthenticationService,
              private readonly doctorService: DoctorService,
              private dialogRef: MatDialogRef<AddNewPatientComponent>) {
  }

  ngOnInit(): void {
    this.userID = this.authService.decodedToken.userId;
  }
  getErrorMessage(formControlName: string): string {
    return this.formService.mapErrorMessages(this.newPatientFormGroup, formControlName)
  }

  isControlValid(formControlName: string): boolean {
    return this.formService.isControlValid(this.newPatientFormGroup, formControlName)
  }
  submitForm() {
    if(this.newPatientFormGroup.valid){
      this.authService.addNewPatient(this.mapAddNewPatientForm(), this.mapSelectedTestToRequest()).pipe(take(1)).subscribe( it => {
        const newPatientUid = it.split(" ").at(-1);
        this.closeDialog(newPatientUid);
      });
    }
  }

  private mapAddNewPatientForm(): UserRegisterForm {
    return {
      email: this.newPatientFormGroup.get('email')?.value || '',
      name: this.newPatientFormGroup.get('name')?.value || '',
      surname: this.newPatientFormGroup.get('surname')?.value || '',
      password: this.newPatientFormGroup.get('password')?.value || '',
      uid: "",
      role: Role.PATIENT,
      doctorID: this.userID
    }
  }

  private mapSelectedTestToRequest(): { uid: TestType; name: TestNameEng }[] {
    return this.selectedTests.map(test => ({name: test.name, uid: test.uid}));
  }

  changeCheckbox(test: { test: Gyroscope; completed: boolean } | { test: FingerTapping; completed: boolean } | { test: Static; completed: boolean } | { test: ToeTapping; completed: boolean } | { test: Voice; completed: boolean }) {
    test.completed = !test.completed
    this.selectedTests = this.allTest.filter(test => test.completed).map(element => element.test)
  }

  closeDialog(newPatientUid: string | undefined) {
    const userRegisterForm = this.mapAddNewPatientForm();

    if(!!newPatientUid || newPatientUid?.includes("auth")){
      const newPatient: Patient = {
        name: userRegisterForm.name,
        surname: userRegisterForm.surname,
        email: userRegisterForm.email,
        patientTests: this.selectedTests,
        uid: newPatientUid
      }

      this.dialogRef.close(newPatient);
    }
  }


}
