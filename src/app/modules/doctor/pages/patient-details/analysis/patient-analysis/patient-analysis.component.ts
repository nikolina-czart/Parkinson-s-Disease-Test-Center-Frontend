import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../../../../models/user/patient/patient";
import {DoctorService} from "../../../../services/doctor.service";
import {FingerTappingAnalysis} from "../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {take} from "rxjs";
import {TremorAnalysis} from "../../../../../../models/analysis/finger-tapping/TremorAnalysis";

@Component({
  selector: 'app-patient-analysis',
  templateUrl: './patient-analysis.component.html',
  styleUrls: ['./patient-analysis.component.scss']
})
export class PatientAnalysisComponent implements OnInit {
  displayedColumns: string[] =  ["timeRange", "side", "averageHours", "medicineSupply", "vectorLength"];

  timeRanges = ["Month", "Three months", "Six months", "All measurements"]
  selectedPatient!: Patient;
  selectedTest!: string;
  selectedTimeRange!: string
  showTable!: boolean;
  fingerTappindData!: FingerTappingAnalysis[];
  tremorData!: TremorAnalysis[];
  showGyroscopeAnalysis!: boolean;
  showFingerTapping!: boolean;

  constructor(private doctorService: DoctorService) {
  }
  ngOnInit(): void {
    this.showTable = false;
    this.showGyroscopeAnalysis = false;
    this.showFingerTapping = false;
    this.selectedPatient = this.doctorService.selectedPatient;
  }

  getAnalysisData() {
    this.showFingerTapping = false;
    this.showGyroscopeAnalysis = false;
    this.showTable = false;

    const body = {
      testNameID: this.selectedTest,
      period: this.selectedTimeRange
    }
    if(this.selectedTest === "FINGER_TAPPING"){
      this.doctorService.getAnalysisData(body).pipe(take(1)).subscribe(data => {
        this.fingerTappindData = data;
        this.showFingerTapping = true;
      })
    }
    if(this.selectedTest === " GYROSCOPE_TEST"){
      this.doctorService.getTremorAnalysisData(body).pipe(take(1)).subscribe(data => {
        this.tremorData = data;
        this.showGyroscopeAnalysis = true;
      })
    }
    this.showTable = true;
  }
}
