import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../../../../models/user/patient/patient";
import {DoctorService} from "../../../../services/doctor.service";
import {FingerTappingAnalysisData} from "../../../../../../models/analysis/finger-tapping/finger-tapping-analysis-data";

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

  constructor(private doctorService: DoctorService) {
  }
  ngOnInit(): void {
    this.showTable = false;
    this.selectedPatient = this.doctorService.selectedPatient;
  }

  getAnalysisData() {
    this.showTable = true;
    console.log("Pobranie analizowanych danych")
    this.getDataToTable();
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
