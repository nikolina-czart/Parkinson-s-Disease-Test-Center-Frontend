import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../../../../models/user/patient/patient";
import {DoctorService} from "../../../../services/doctor.service";
import {FingerTappingAnalysisData} from "../../../../../../models/analysis/finger-tapping/table/finger-tapping-analysis-data";
import {
  FingerTappingAnalysisHistogram
} from "../../../../../../models/analysis/finger-tapping/histogram/finger-tapping-analysis-histogram";
import {AnalysisDataService} from "../../../../services/analysis-data.service";
import {take} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-patient-analysis',
  templateUrl: './patient-analysis.component.html',
  styleUrls: ['./patient-analysis.component.scss']
})
export class PatientAnalysisComponent implements OnInit {
  displayedColumns: string[] =  ["timeRange", "side", "averageHours", "medicineSupply", "vectorLength"];

  timeRanges = ["Miesiąc", "Trzy miesiące", "Pół roku"]
  selectedPatient!: Patient;
  selectedTest!: string;
  selectedTimeRange!: string
  showTable!: boolean;
  tableData!: FingerTappingAnalysisData[];
  histogramData!: FingerTappingAnalysisHistogram[];

  constructor(private doctorService: DoctorService,
              private analysisService: AnalysisDataService) {
  }
  ngOnInit(): void {
    this.showTable = false;
    this.selectedPatient = this.doctorService.selectedPatient;

    const body = {
      testNameID: "FINGER_TAPPING",
      period: "Miesiąc"
    }

    this.analysisService.getAnalysisData(body).pipe(take(1)).subscribe(data => {
      this.histogramData = data;
    })
  }

  getAnalysisData() {
    this.showTable = true;


    console.log("Pobranie analizowanych danych")
    this.getDataToTable();
    // this.getDataToHistogram();
  }

  private getDataToTable() {
    this.tableData = [
      {
        period: "Marzec",
        data: {
          dataBeforeMed: [
            {
              name: "Touch Time",
              meanLeft: 100,
              deviationLeft: 20,
              meanRight: 130,
              deviationRight: 30
            },
            {
              name: "Up Time",
              meanLeft: 100,
              deviationLeft: 20,
              meanRight: 130,
              deviationRight: 30
            },
            {
              name: "Intertap Interval",
              meanLeft: 100,
              deviationLeft: 20,
              meanRight: 130,
              deviationRight: 30
            },
          ],
          dataAfterMed: [
            {
              name: "Touch Time",
              meanLeft: 100,
              deviationLeft: 20,
              meanRight: 130,
              deviationRight: 30
            },
            {
              name: "Up Time",
              meanLeft: 100,
              deviationLeft: 20,
              meanRight: 130,
              deviationRight: 30
            },
            {
              name: "Intertap Interval",
              meanLeft: 100,
              deviationLeft: 20,
              meanRight: 130,
              deviationRight: 30
            },
          ]
        }
      },
      {
        period: "Kwiecień",
        data: {
          dataBeforeMed: [
            {
              name: "Touch Time",
              meanLeft: 100,
              deviationLeft: 20,
              meanRight: 130,
              deviationRight: 30
            },
            {
              name: "Up Time",
              meanLeft: 100,
              deviationLeft: 20,
              meanRight: 130,
              deviationRight: 30
            },
            {
              name: "Intertap Interval",
              meanLeft: 100,
              deviationLeft: 20,
              meanRight: 130,
              deviationRight: 30
            },
          ],
          dataAfterMed: [
            {
              name: "Touch Time",
              meanLeft: 100,
              deviationLeft: 20,
              meanRight: 130,
              deviationRight: 30
            },
            {
              name: "Up Time",
              meanLeft: 100,
              deviationLeft: 20,
              meanRight: 130,
              deviationRight: 30
            },
            {
              name: "Intertap Interval",
              meanLeft: 100,
              deviationLeft: 20,
              meanRight: 130,
              deviationRight: 30
            },
          ]
        }
      },
    ]
  }
}
