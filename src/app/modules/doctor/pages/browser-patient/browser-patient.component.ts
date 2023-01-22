import { Component } from '@angular/core';
import {Patient} from "../../../../models/user/patient";
import {Gyroscope} from "../../../../models/tests/gyroscope";
import {FingerTapping} from "../../../../models/tests/finger-tapping";
import {ToeTapping} from "../../../../models/tests/toe-tapping";
import {Voice} from "../../../../models/tests/voice";
import {Static} from "../../../../models/tests/static";
import {NavigationExtras, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddNewPatientComponent} from "../add-new-patient/add-new-patient.component";
import {take} from "rxjs";

const ELEMENT_DATA: Patient[] = [
  {position: 1, uid: "1", fullName: 'Nikolina Czart', email: "nikola.czart@gmail.com", patientTests: [new Gyroscope(), new FingerTapping(), new ToeTapping()]},
  {position: 2, uid: "2", fullName: 'Szymon Wiśniewski', email: "nikola.czart@gmail.com", patientTests: [new Voice(), new FingerTapping()]},
  {position: 3, uid: "3", fullName: 'Grzegorz Tomsia', email: "nikola.czart@gmail.com", patientTests: [new Static()]},

];
@Component({
  selector: 'app-browser-patient',
  templateUrl: './browser-patient.component.html',
  styleUrls: ['./browser-patient.component.scss']
})
export class BrowserPatientComponent {
  displayedColumns: string[] = ['position', 'fullName', 'email', 'patientTests', 'details'];
  dataSource = ELEMENT_DATA;
  selectedPatient?: Patient

  constructor(private readonly router: Router,
              private readonly dialog: MatDialog) {
  }

  showPatientDetails(patient: Patient) {
    this.router.navigate(['/browser-patient', patient.uid], {state: {patient: patient}})
    console.log(this.selectedPatient)
  }

  addNewPatient() {
    const dialogRef = this.dialog.open(AddNewPatientComponent);

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
