import {Component, OnInit} from '@angular/core';
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
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {DoctorService} from "../../services/doctor.service";

// const ELEMENT_DATA: Patient[] = [
//   {position: 1, uid: "1", fullName: 'Nikolina Czart', email: "nikola.czart@gmail.com", patientTests: [new Gyroscope(), new FingerTapping(), new ToeTapping()]},
//   {position: 2, uid: "2", fullName: 'Szymon Wiśniewski', email: "nikola.czart@gmail.com", patientTests: [new Voice(), new FingerTapping()]},
//   {position: 3, uid: "3", fullName: 'Grzegorz Tomsia', email: "nikola.czart@gmail.com", patientTests: [new Static()]},
//
// ];
@Component({
  selector: 'app-browser-patient',
  templateUrl: './browser-patient.component.html',
  styleUrls: ['./browser-patient.component.scss']
})
export class BrowserPatientComponent implements OnInit {
  // displayedColumns: string[] = ['fullName', 'email', 'patientTests', 'details'];
  displayedColumns: string[] = ['fullName', 'patientTests', 'details'];
  patients!: Patient[];
  selectedPatient?: Patient

  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly doctorService: DoctorService) {
  }

  ngOnInit() {
     this.doctorService.getPatients().pipe(take(1)).subscribe(patients => {
       this.patients = patients;
     })
  }

  showPatientDetails(patient: Patient) {
    this.doctorService.setSelectedPatient(patient);
    this.router.navigate(['/browser-patient', patient.uid], {state: {patient: patient}})
  }

  addNewPatient() {
    const dialogRef = this.dialog.open(AddNewPatientComponent);

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
