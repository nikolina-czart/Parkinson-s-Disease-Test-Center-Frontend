import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Patient} from "../../../../models/user/patient";
import {DoctorService} from "../../services/doctor.service";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit{
  name = ""
  selectedPatient!: Patient;

  constructor(private router: Router,
              private doctorService: DoctorService) {
  }
  ngOnInit() {
    this.selectedPatient = this.doctorService.selectedPatient;
  }

  navigateToEdit() {
    this.router.navigateByUrl(`browser-patient/${this.selectedPatient.uid}/edit`)
  }

  navigateToResult() {
    this.router.navigateByUrl(`browser-patient/${this.selectedPatient.uid}/result`)
  }

  navigateToAnalysis() {
    this.router.navigateByUrl(`browser-patient/${this.selectedPatient.uid}/analysis`)
  }

  navigateToBrowserPatient() {
    this.router.navigateByUrl(`browser-patient`)

  }
}
