import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../../models/user/patient/patient";
import {Router} from "@angular/router";
import {DoctorService} from "../../services/doctor.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {TestDistribution} from "../../../../models/tests/test-distribution";
import {take} from "rxjs";
import {FormService} from "../../../../core/services/form.service";
import {PatientService} from "../../services/patient.service";
import {MatDialog} from "@angular/material/dialog";
import {RemovePatientComponent} from "../remove-patient/remove-patient.component";
import {UserRegisterForm} from "../../../../models/user/shared/user-register-form";
import {Role} from "../../../../models/user/shared/user-role";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {createSelectedPatientFormGroup, mapUserForm} from "../../../../../utils/form-utils";
// import {testCheckboxesSelector} from "../../../../models/tests/test-checkboxes-selector";
// import {TestModelFirebase} from "../../../../models/tests/test-model-firebase";
// import {TestSelectorChecked} from "../../../../models/tests/test-selector-checked";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {
  selectedPatient!: Patient;
  selectedPatientFormGroup!: FormGroup;
  // selectedTests: TestDistribution[] = []
  // testCheckboxesSelector = testCheckboxesSelector;
  isReadOnlyMode: boolean = true;
  private doctorID!: string;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private doctorService: DoctorService,
              private readonly formService: FormService,
              private readonly patientService: PatientService,
              public dialog: MatDialog,
              private readonly authService: AuthenticationService) {
  }

  ngOnInit() {
    this.selectedPatient = this.doctorService.selectedPatient;
    this.doctorID = this.authService.decodedToken.userId;
    this.selectedPatientFormGroup = createSelectedPatientFormGroup(this._formBuilder);
    this.patientSetDefaultValue();

    // this.selectedTests = this.selectedPatient.patientTests;
    // this.selectedTests.forEach(test => {
    //   this.testCheckboxesSelector.map(it => {
    //     if (test.uid === it.test.uid) {
    //       this.changeCheckbox({
    //         test: it.test,
    //         checked: true
    //       })
    //     }
    //   })
    // })
    //
    // console.log(this.selectedPatient)
    // console.log(this.selectedTests)
    // console.log(this.testCheckboxesSelector)
  }

  getErrorMessage(formControlName: string): string {
    return this.formService.mapErrorMessages(this.selectedPatientFormGroup, formControlName)
  }

  isControlValid(formControlName: string): boolean {
    return this.formService.isControlValid(this.selectedPatientFormGroup, formControlName)
  }

  // changeCheckbox(test: TestSelectorChecked) {
  //   console.log("test: ", test)
  //   console.log(this.testCheckboxesSelector)
  //
  //   test.checked = !test.checked
  //   this.selectedTests = this.testCheckboxesSelector.filter(test => test.checked).map(element => element.test)
  // }

  editPatientData() {
    this.isReadOnlyMode = false;
    for (const control in this.selectedPatientFormGroup.controls) {
      this.selectedPatientFormGroup.get(control)!.enable();
    }
  }

  deletePatient() {
    const dialogRef = this.dialog.open(RemovePatientComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.removePatientAccount(this.selectedPatient.uid).pipe(take(1)).subscribe(it => {
          this.router.navigateByUrl("/browser-patient")
        });
      }
    });
  }

  updatePatient() {
    if (this.selectedPatientFormGroup.valid) {
      this.patientService.updatePatientData(
        mapUserForm(this.selectedPatientFormGroup, this.selectedPatient.uid, this.doctorID, Role.PATIENT), this.selectedPatient.uid)
        .pipe(take(1)).subscribe();
    }
  }

  cancelEditMode() {
    this.isReadOnlyMode = true;
    for (const control in this.selectedPatientFormGroup.controls) {
      this.selectedPatientFormGroup.get(control)!.disable();
    }
  }

  private patientSetDefaultValue() {
    this.selectedPatientFormGroup.setValue({
      name: this.selectedPatient.name,
      surname: this.selectedPatient.surname
    })
  }
}
