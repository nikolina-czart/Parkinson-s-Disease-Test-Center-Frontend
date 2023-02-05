import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormService} from "../../../../core/services/form.service";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {Role} from "../../../../models/user/shared/user-role";
import {TestDistribution} from "../../../../models/tests/test-distribution";
import {take} from "rxjs";
import {DoctorService} from "../../services/doctor.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Patient} from "../../../../models/user/patient/patient";
import {createNewUserFormGroup, mapUserForm} from "../../../../../utils/form-utils";
import {testCheckboxesSelector} from "../../../../models/tests/test-checkboxes-selector";
import {getLastElementFromString} from "../../../../../utils/app-utils";
import {TestModelFirebase} from "../../../../models/tests/test-model-firebase";
import {TestSelectorChecked} from "../../../../models/tests/test-selector-checked";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.scss']
})
export class AddNewPatientComponent implements OnInit {
  hidePassword = true;
  hidePasswordConfirmation = true;
  newPatientFormGroup!: FormGroup;
  selectedTests: TestDistribution[] = []
  testCheckboxesSelector = testCheckboxesSelector;
  private userID!: string;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly formService: FormService,
              private readonly authService: AuthenticationService,
              private readonly doctorService: DoctorService,
              private dialogRef: MatDialogRef<AddNewPatientComponent>,
              private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.userID = this.authService.decodedToken.userId;
    this.newPatientFormGroup = createNewUserFormGroup(this._formBuilder);
  }

  getErrorMessage(formControlName: string): string {
    return this.formService.mapErrorMessages(this.newPatientFormGroup, formControlName)
  }

  isControlValid(formControlName: string): boolean {
    return this.formService.isControlValid(this.newPatientFormGroup, formControlName)
  }

  submitForm() {
    if (this.newPatientFormGroup.valid) {
      this.userService.addNewPatient(mapUserForm(this.newPatientFormGroup, "", this.userID, Role.PATIENT),
        this.mapSelectedTestToRequest()).pipe(take(1)).subscribe(it => {
        const newPatientUid = getLastElementFromString(it);
        this.closeDialog(newPatientUid);
      });
    }
  }

  changeCheckbox(test: TestSelectorChecked) {
    test.checked = !test.checked
    this.selectedTests = this.testCheckboxesSelector.filter(test => test.checked).map(element => element.test)
  }

  closeDialog(newPatientUid: string | undefined) {
    const userRegisterForm = mapUserForm(this.newPatientFormGroup, "", this.userID, Role.PATIENT);

    if (!!newPatientUid || newPatientUid?.includes("auth")) {
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

  private mapSelectedTestToRequest(): TestModelFirebase[] {
    return this.selectedTests.map(test => ({name: test.name, uid: test.uid}));
  }
}
