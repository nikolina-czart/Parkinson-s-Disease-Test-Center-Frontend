import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../../../../models/user/patient/patient";
import {DoctorService} from "../../../../services/doctor.service";
import {FingerTappingAnalysisData} from "../../../../../../models/analysis/finger-tapping/table/finger-tapping-analysis-data";
import {
  FingerTappingAnalysis
} from "../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {AnalysisDataService} from "../../../../services/analysis-data.service";
import {take} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {TremorAnalysis} from "../../../../../../models/analysis/finger-tapping/TremorAnalysis";

@Component({
  selector: 'app-patient-analysis',
  templateUrl: './patient-analysis.component.html',
  styleUrls: ['./patient-analysis.component.scss']
})
export class PatientAnalysisComponent implements OnInit {
  displayedColumns: string[] =  ["timeRange", "side", "averageHours", "medicineSupply", "vectorLength"];

  timeRanges = ["Miesiąc", "Trzy miesiące", "Pół roku", "Wszystkie pomiary"]
  selectedPatient!: Patient;
  selectedTest!: string;
  selectedTimeRange!: string
  showTable!: boolean;
  fingerTappindData!: FingerTappingAnalysis[];
  tremorData!: TremorAnalysis[];
  showGyroscopeAnalysis!: boolean;

  constructor(private doctorService: DoctorService) {
  }
  ngOnInit(): void {
    this.showTable = false;
    this.showGyroscopeAnalysis = false;
    this.selectedPatient = this.doctorService.selectedPatient;
  }

  getAnalysisData() {
    console.log(this.selectedTest)
    if(this.selectedTest === "FINGER_TAPPING"){
      const body = {
        testNameID: "FINGER_TAPPING",
        period: "Pół roku"
      }
      console.log(body)
      // this.doctorService.getAnalysisData(body).pipe(take(1)).subscribe(data => {
      //   this.fingerTappindData = data;
      // })
    }
    if(this.selectedTest === " GYROSCOPE"){
      const body = {
        testNameID: " GYROSCOPE",
        period: "Pół roku"
      }
      this.doctorService.getTremorAnalysisData(body).pipe(take(1)).subscribe(data => {
        this.tremorData = data;
        this.showGyroscopeAnalysis = true
      })
    }
    this.showTable = true;
  }
}
