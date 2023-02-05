import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Patient} from "../../../../models/user/patient/patient";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddNewPatientComponent} from "../add-new-patient/add-new-patient.component";
import {Observable, of, take} from "rxjs";
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
              private readonly doctorService: DoctorService,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
     this.doctorService.getPatients().pipe(take(1)).subscribe(patients => {
       this.patients = patients;
       console.log(this.patients[0].patientTests)
       this.showTable = !!this.patients.length
     })
  }

  showPatientDetails(patient: Patient) {
    this.doctorService.setSelectedPatient(patient);
    this.router.navigateByUrl(`browser-patient/${patient.uid}/edit`)
  }

  addNewPatient(): Observable<Patient[]> {
    const dialogRef = this.dialog.open(AddNewPatientComponent);

    dialogRef.afterClosed().pipe(take(1)).subscribe(newPatient => {
      if(!!newPatient){
        this.patients.push(newPatient)
        this.refresh();
      }
    });
    return of(this.patients)
  }

  refresh() {
    this.doctorService.getPatients().pipe(take(1)).subscribe(patients => {
      this.patients = patients;
      this.showTable = !!this.patients.length
      this.changeDetectorRefs.detectChanges();
    })
  }
}
