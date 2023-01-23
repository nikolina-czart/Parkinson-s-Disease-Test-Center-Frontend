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

@Component({
  selector: 'app-browser-patient',
  templateUrl: './browser-patient.component.html',
  styleUrls: ['./browser-patient.component.scss']
})
export class BrowserPatientComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'email', 'patientTests', 'details'];
  patients!: Patient[];
  showTable: boolean = false

  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly doctorService: DoctorService) {
  }

  ngOnInit() {
     this.doctorService.getPatients().pipe(take(1)).subscribe(patients => {
       this.patients = patients;
       this.showTable = !!this.patients.length
     })
  }

  showPatientDetails(patient: Patient) {
    this.doctorService.setSelectedPatient(patient);
    this.router.navigateByUrl(`browser-patient/${patient.uid}/edit`)  }

  addNewPatient() {
    const dialogRef = this.dialog.open(AddNewPatientComponent);

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
