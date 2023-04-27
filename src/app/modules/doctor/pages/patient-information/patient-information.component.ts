import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../../models/user/patient/patient";
import {DoctorService} from "../../services/doctor.service";
// import {TestDistribution} from "../../../../models/tests/test-distribution";
import {UserService} from "../../../shared/services/user.service";
import {PatientTestDetails} from "../../../../models/user/patient/patient-test-details";
import {Observable, take} from "rxjs";
import {AuthenticationService} from "../../../../core/services/authentication.service";
import {UserDetails} from "../../../../models/user/shared/user-model";
import {ConfigTests} from "../../../../models/tests/config-tests";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-patient-information',
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.scss']
})
export class PatientInformationComponent implements OnInit {
  displayedColumns: string[] = ['testName', 'testIcon', 'startDate', 'lastDate', 'numberTest'];
  selectedPatient!: Patient;
  selectedTests!: ConfigTests[];
  showTable: boolean = false;

  dataSource!: MatTableDataSource<ConfigTests>;

  constructor(private doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.selectedPatient = this.doctorService.selectedPatient;
    this.selectedTests = this.selectedPatient.patientTests;
    this.dataSource = new MatTableDataSource<ConfigTests>(this.selectedTests)
    this.showTable = !!this.selectedTests.length;
    console.log(this.selectedTests)
  }

}
