import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfigService} from "../../../doctor/services/config.service";
import {UserService} from "../../../shared/services/user.service";
import {AdminService} from "../../services/admin.service";
import {Doctor} from "../../../../models/user/admin/doctor";
import {Observable, of, take} from "rxjs";
import {
  RemovePatientComponent
} from "../../../doctor/pages/patient-details/information/remove-patient/remove-patient.component";
import {Patient} from "../../../../models/user/patient/patient";
import {AddNewPatientComponent} from "../../../doctor/pages/add-new-patient/add-new-patient.component";
import {AddDoctorComponent} from "./components/add-doctor/add-doctor.component";

@Component({
  selector: 'app-browser-doctors',
  templateUrl: './browser-doctors.component.html',
  styleUrls: ['./browser-doctors.component.scss']
})
export class BrowserDoctorsComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'email', 'patientsNumber', 'controlsNumber', 'details'];
  doctorsDataSource!: MatTableDataSource<Doctor>;
  doctors!: Doctor[];
  showTable: boolean = false
  loading = true;

  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly adminService: AdminService,
              private changeDetectorRefs: ChangeDetectorRef,
              private readonly configService: ConfigService,
              private readonly userService: UserService) {
  }

  ngOnInit() {
    this.adminService.getDoctors().pipe(take(1)).subscribe(doctors => {
      this.doctors = doctors;
      this.doctorsDataSource = new MatTableDataSource(doctors);
      this.showTable = !!doctors.length;
      this.loading = false;
    })
  }

  searchFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.doctorsDataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewDoctor() {
    const dialogRef = this.dialog.open(AddDoctorComponent);

    dialogRef.afterClosed().pipe(take(1)).subscribe(newDoctor => {
      if(!!newDoctor){
        this.doctors.push(newDoctor)
        this.doctorsDataSource.data = [...this.doctors];
      }
    });
  }

  removeDoctor(doctorToRemove: Doctor) {
    const dialogRef = this.dialog.open(RemovePatientComponent);
    dialogRef.afterClosed().pipe(take(1)).subscribe(isRemove => {
      if(isRemove){
        this.adminService.removeDoctorAccount(doctorToRemove).pipe(take(1)).subscribe(it => {
          const index = this.doctorsDataSource.data.findIndex(doctor => doctor.uid === doctorToRemove.uid);
          if (index !== -1) {
            this.doctorsDataSource.data.splice(index, 1);
            this.doctors.splice(index, 1);
          }
          this.doctorsDataSource.data = [...this.doctorsDataSource.data];
          this.router.navigateByUrl('/browser-doctors')
        });
      }
    })
  }
}
