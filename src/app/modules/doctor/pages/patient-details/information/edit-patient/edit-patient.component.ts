import {Component, Input, OnInit} from '@angular/core';
import {ConfigTests} from "../../../../../../models/tests/config-tests";
import {Patient} from "../../../../../../models/user/patient/patient";
import {FormBuilder, FormGroup} from "@angular/forms";
import {createSelectedPatientFormGroup} from "../../../../../../../utils/form-utils";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {DoctorService} from "../../../../services/doctor.service";
import {FormService} from "../../../../../../core/services/form.service";
import {PatientService} from "../../../../services/patient.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfigService} from "../../../../services/config.service";
import {testCheckboxesSelector} from "../../../../../../models/tests/test-checkboxes-selector";

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  @Input() patient!: Patient;
  @Input() tests!: ConfigTests[];
  selectedPatientFormGroup!: FormGroup;
  testCheckboxesSelector!: testCheckboxesSelector[];
  selectedTests: ConfigTests[] = []

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private doctorService: DoctorService,
              private readonly formService: FormService,
              private readonly patientService: PatientService,
              public dialog: MatDialog,
              private readonly configService: ConfigService,
              private dialogRef: MatDialogRef<EditPatientComponent>) {
  }

  ngOnInit() {
    this.selectedPatientFormGroup = createSelectedPatientFormGroup(this._formBuilder);
    this.patientSetDefaultValue();
    this.configService.configTest().pipe(take(1)).subscribe(configTests => {
      this.testCheckboxesSelector = configTests.map(test => ({...test, checked: false}))
      const values = this.tests.map(test => test.uid);
      this.testCheckboxesSelector.filter(checkbox => values.includes(checkbox.uid))
        .forEach(checkbox => checkbox.checked = true);
    })
  }
  updatePatient() {
    if (this.selectedPatientFormGroup.valid) {
      this.refreshPatientData();
      this.saveNewPatientData();
      this.addNewTestToPatient();
      this.removeOldTestFromPatient();
      this.closeDialogWindow()
    }
  }

  getErrorMessage(formControlName: string): string {
    return this.formService.mapErrorMessages(this.selectedPatientFormGroup, formControlName)
  }

  isControlValid(formControlName: string): boolean {
    return this.formService.isControlValid(this.selectedPatientFormGroup, formControlName)
  }

  changeCheckbox(test: testCheckboxesSelector) {
    test.checked = !test.checked
    this.selectedTests = this.testCheckboxesSelector.filter(test => test.checked)
  }

  private patientSetDefaultValue() {
    this.selectedPatientFormGroup.setValue({
      name: this.patient.name,
      surname: this.patient.surname
    })
  }

  private refreshPatientData(){
    this.patient = {
      ...this.patient,
      name: this.selectedPatientFormGroup.get("name")?.value,
      surname: this.selectedPatientFormGroup.get("surname")?.value
    }
    this.selectedTests = this.testCheckboxesSelector.filter(test => test.checked);
  }

  private closeDialogWindow():void {
    this.dialogRef.close({patient: this.patient, tests: this.selectedTests})
  }

  private getUpdateValues() {
    return [
      {
        fieldName: "name",
        fieldValue: this.patient.name
      },
      {
        fieldName: "surname",
        fieldValue: this.patient.surname
      }
    ]
  }

  private saveNewPatientData() {
    const updates = this.getUpdateValues();
    this.patientService.updatePatientData(this.patient.uid, updates).pipe(take(1)).subscribe();
  }

  private addNewTestToPatient() {
    const testToAdd = this.selectedTests.filter(test => !this.tests.includes(test)).map(({name, uid}) => ({name, uid}))
    if(testToAdd.length !== 0) {
      this.patientService.addNewTests(this.patient.uid, testToAdd).pipe(take(1)).subscribe();
    }
  }

  private removeOldTestFromPatient() {
    const testToRemove = this.tests.filter(test => !this.selectedTests.includes(test)).map(({name, uid}) => ({name, uid}))
    if(testToRemove.length !== 0){
      this.patientService.removeOldTest(this.patient.uid, testToRemove).pipe(take(1)).subscribe();
    }
  }
}
