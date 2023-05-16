import {Component, Input} from '@angular/core';
import {ConfigTests} from "../../../../../../models/tests/config-tests";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Patient} from "../../../../../../models/user/patient/patient";
import {FormService} from "../../../../../../core/services/form.service";
import {AuthenticationService} from "../../../../../../core/services/authentication.service";
import {DoctorService} from "../../../../../doctor/services/doctor.service";
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../../shared/services/user.service";
import {createNewUserFormGroup, mapUserForm} from "../../../../../../../utils/form-utils";
import {Role} from "../../../../../../models/user/shared/user-role";
import {take} from "rxjs";
import {getLastElementFromString, getUidFromString} from "../../../../../../../utils/app-utils";
import {TestModelFirebase} from "../../../../../../models/tests/test-model-firebase";
import {Doctor} from "../../../../../../models/user/admin/doctor";

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent {
  doctorForm!: FormGroup;
  doctorDataSummary!: Doctor;
  newDoctorFormGroup!: FormGroup;

  private userID!: string;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly formService: FormService,
              private readonly authService: AuthenticationService,
              private readonly doctorService: DoctorService,
              private dialogRef: MatDialogRef<AddDoctorComponent>,
              private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.userID = this.authService.decodedToken.userId;
    this.newDoctorFormGroup = createNewUserFormGroup(this._formBuilder);
  }

  getDoctorForm(doctorForm: FormGroup) {
    this.doctorForm = doctorForm;

    this.doctorDataSummary = {
      name: this.doctorForm.controls['name'].value,
      surname: this.doctorForm.controls['surname'].value,
      email: this.doctorForm.controls['email'].value,
      uid: "",
      patientsNumber: 0,
      controlsNumber: 0
    }
  }

  onSaveFormClick() {
    if(this.newDoctorFormGroup.valid){
      this.userService.addDoctor(mapUserForm(this.newDoctorFormGroup, "", "", Role.DOCTOR, false))
        .pipe(take(1)).subscribe(it => {
        const uid = getUidFromString(it);
        this.userService.createSnackBar("New doctor account added correctly");
        this.closeDialog(uid);
      })
    }
  }

  closeDialog(uid: string | undefined) {
    const userRegisterForm = mapUserForm(this.newDoctorFormGroup, "", this.userID, Role.DOCTOR, false);

    if (!!uid || uid?.includes("auth")) {
      const doctorPatient: Doctor = {
        name: userRegisterForm.name,
        surname: userRegisterForm.surname,
        email: userRegisterForm.email,
        uid: uid,
        patientsNumber: 0,
        controlsNumber: 0
      }

      this.dialogRef.close(doctorPatient);
    }
  }

}
