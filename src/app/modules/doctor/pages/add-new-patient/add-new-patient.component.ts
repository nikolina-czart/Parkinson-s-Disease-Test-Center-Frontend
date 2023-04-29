import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormService} from "../../../../core/services/form.service";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {Role} from "../../../../models/user/shared/user-role";
import {DoctorService} from "../../services/doctor.service";
import {MatDialogRef} from "@angular/material/dialog";
import {createNewUserFormGroup, mapUserForm} from "../../../../../utils/form-utils";
import {UserService} from "../../../shared/services/user.service";
import {ConfigTests} from "../../../../models/tests/config-tests";
import {TestModelFirebase} from "../../../../models/tests/test-model-firebase";
import {take} from "rxjs";
import {getLastElementFromString} from "../../../../../utils/app-utils";
import {Patient} from "../../../../models/user/patient/patient";

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.scss']
})
export class AddNewPatientComponent implements OnInit {
  @Input() tests!: ConfigTests[];
  patientForm!: FormGroup;
  patientTests!: ConfigTests[];
  patientDataSummary!: Patient;
  newPatientFormGroup!: FormGroup;

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

  getPatientForm(patientForm: FormGroup) {
    this.patientForm = patientForm;
  }

  getSelectedTest(selectedTests: ConfigTests[]) {
    this.patientTests = selectedTests;

    this.patientDataSummary = {
      name: this.patientForm.controls['name'].value,
      surname: this.patientForm.controls['surname'].value,
      email: this.patientForm.controls['email'].value,
      patientTests: this.patientTests.map(test => ({...test,
        numberTest: "Brak przeprowadzonych testów",
        lastDate: "Brak przeprowadzonych testów",
        startDate: "Brak przeprowadzonych testów"
      })),
      uid: "",
      controlGroup: false
    }
  }

  onSaveFormClick(controlGroup: boolean) {
    if (this.newPatientFormGroup.valid) {
      this.userService.addNewPatient(mapUserForm(this.newPatientFormGroup, "", this.userID, Role.PATIENT, controlGroup),
        this.mapSelectedTestToRequest()).pipe(take(1)).subscribe(it => {
        const newPatientUid = getLastElementFromString(it);
        this.closeDialog(newPatientUid, controlGroup);
      });
    }
  }

  closeDialog(newPatientUid: string | undefined, controlGroup: boolean) {
    const userRegisterForm = mapUserForm(this.newPatientFormGroup, "", this.userID, Role.PATIENT, controlGroup);

    if (!!newPatientUid || newPatientUid?.includes("auth")) {
      const newPatient: Patient = {
        name: userRegisterForm.name,
        surname: userRegisterForm.surname,
        email: userRegisterForm.email,
        patientTests: this.patientTests.map(test => ({...test,
          numberTest: "Brak przeprowadzonych testów",
          lastDate: "Brak przeprowadzonych testów",
          startDate: "Brak przeprowadzonych testów"
        })),
        uid: newPatientUid,
        controlGroup: controlGroup
      }

      this.dialogRef.close(newPatient);
    }
  }

  private mapSelectedTestToRequest(): TestModelFirebase[] {
    return this.patientTests.map(test => ({name: test.name, uid: test.uid}));
  }

}
