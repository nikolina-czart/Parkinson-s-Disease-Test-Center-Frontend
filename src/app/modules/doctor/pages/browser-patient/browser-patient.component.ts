import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Patient} from "../../../../models/user/patient/patient";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddNewPatientComponent} from "../add-new-patient/add-new-patient.component";
import {Observable, of, take} from "rxjs";
import {DoctorService} from "../../services/doctor.service";
import {ConfigService} from "../../services/config.service";
import {MatTableDataSource} from "@angular/material/table";
import {ConfigTests} from "../../../../models/tests/config-tests";
import {UserService} from "../../../shared/services/user.service";
import {UserDetails} from "../../../../models/user/shared/user-model";
import {Role} from "../../../../models/user/shared/user-role";

@Component({
  selector: 'app-browser-patient',
  templateUrl: './browser-patient.component.html',
  styleUrls: ['./browser-patient.component.scss']
})
export class BrowserPatientComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'email', 'patientTests', 'details'];
  patientsDataSource!: MatTableDataSource<Patient>;
  patients!: Patient[];
  showTable: boolean = false
  configTest!: ConfigTests[];
  loading = true;
  user!: UserDetails | undefined;

  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly doctorService: DoctorService,
              private changeDetectorRefs: ChangeDetectorRef,
              private readonly configService: ConfigService,
              private readonly userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserDetails().pipe(take(1)).subscribe(user => {
      this.user = user
      if(user.role===Role.DOCTOR){
        this.getDataForRoleDoctor();
      }else if(user.role===Role.ADMIN) {
        this.router.navigateByUrl(`browser-doctors`)
      }
    })
  }

  showPatientDetails(patient: Patient) {
    this.doctorService.setSelectedPatient(patient);
    this.router.navigateByUrl(`browser-patient/${patient.uid}/information`)
  }

  addNewPatient(): Observable<MatTableDataSource<Patient>> {
    const dialogRef = this.dialog.open(AddNewPatientComponent);
    dialogRef.componentInstance.tests = this.configTest;

    dialogRef.afterClosed().pipe(take(1)).subscribe(newPatient => {
      if(!!newPatient){
        this.patients.push(newPatient)
        this.patientsDataSource.data = this.patients;
        this.refresh();
      }
    });
    return of(this.patientsDataSource)
  }

  refresh() {
    this.configService.configTest().pipe(take(1)).subscribe(configTests => {
      this.doctorService.getPatients(configTests).pipe(take(1)).subscribe(patients => {
        this.patients = patients;
        this.patientsDataSource = new MatTableDataSource(patients)
        this.showTable = !!patients.length
        this.changeDetectorRefs.detectChanges();
      })
    })
  }

  searchFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.patientsDataSource.filter = filterValue.trim().toLowerCase();
  }

  private getDataForRoleDoctor(): void {
    this.configService.configTest().pipe(take(1)).subscribe(configTests => {
      this.doctorService.getPatients(configTests).pipe(take(1)).subscribe(patients => {
        this.patients = patients;
        this.patientsDataSource = new MatTableDataSource(patients);
        this.showTable = !!patients.length;
        this.configTest = configTests;
        this.loading = false;
      })
    })
  }
}
