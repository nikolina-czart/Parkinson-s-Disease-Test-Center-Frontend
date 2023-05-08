import {Component, OnInit} from '@angular/core';
import {DoctorService} from "../../../services/doctor.service";
import {MatTableDataSource} from "@angular/material/table";
import {ConfigTests} from "../../../../../models/tests/config-tests";
import {Patient} from "../../../../../models/user/patient/patient";
import {Observable, of, take} from "rxjs";
import {AddNewPatientComponent} from "../../add-new-patient/add-new-patient.component";
import {MatDialog} from "@angular/material/dialog";
import {EditPatientComponent} from "./edit-patient/edit-patient.component";
import {Router} from "@angular/router";
import {RemovePatientComponent} from "./remove-patient/remove-patient.component";
import {PatientService} from "../../../services/patient.service";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  isNotEditMode: boolean = true;
  selectedPatient!: Patient;
  selectedTests!: ConfigTests[];
  showTable: boolean = false;
  dataSource!: MatTableDataSource<ConfigTests>;

  constructor(private doctorService: DoctorService,
              private readonly dialog: MatDialog,
              private readonly patientService: PatientService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.selectedPatient = this.doctorService.selectedPatient;
    console.log(this.selectedPatient)
    this.selectedTests = this.selectedPatient.patientTests;
    this.dataSource = new MatTableDataSource<ConfigTests>(this.selectedTests)
    this.showTable = !!this.selectedTests.length;
  }
  editPatientData() {
    const dialogRef = this.dialog.open(EditPatientComponent);
    dialogRef.componentInstance.patient = this.selectedPatient;
    dialogRef.componentInstance.tests = this.selectedTests;
    dialogRef.afterClosed().pipe(take(1)).subscribe(newData => {
      if(newData){
        this.selectedPatient = newData.patient;
        this.selectedTests = newData.tests;
        this.dataSource.data = this.selectedTests;
      }
    })
  }

  deletePatient() {
    const dialogRef = this.dialog.open(RemovePatientComponent);
    dialogRef.afterClosed().pipe(take(1)).subscribe(isRemove => {
      if(isRemove){
        this.patientService.removePatientAccount(this.selectedPatient.uid).pipe(take(1)).subscribe();
        this.router.navigateByUrl(`browser-patient`)
      }
    })
  }
}
