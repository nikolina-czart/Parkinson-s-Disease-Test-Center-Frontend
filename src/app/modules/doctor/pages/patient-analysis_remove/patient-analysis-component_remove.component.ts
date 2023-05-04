import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../../models/user/patient/patient";
import {Result} from "../../../../models/results/result";
import {Router} from "@angular/router";
import {DoctorService} from "../../services/doctor.service";
import {take} from "rxjs";
import {AggregatedData} from "../../../../models/analysis/analysis-data";
// import {TestType} from "../../../../models/tests/test-info";

@Component({
  selector: 'app-patient-analysis',
  templateUrl: './patient-analysis-component_remove.component.html',
  styleUrls: ['./patient-analysis-component_remove.component.scss']
})
export class PatientAnalysisComponent_remove implements OnInit{
  displayedColumns: string[] =  ["timeRange", "side", "averageHours", "medicineSupply", "vectorLength"];

  timeRanges = ["Miesiąc", "Trzy miesiące", "Pół roku", "Wszystkie pomiary"]
  selectedPatient!: Patient;
  selectedTest!: string;
  selectedTimeRange!: string
  aggregatedData!: AggregatedData[];
  isSend: boolean = false;
  showTable!: boolean;
  constructor(private router: Router,
              private doctorService: DoctorService) {
  }
  ngOnInit(): void {
    this.showTable = false;
    this.selectedPatient = this.doctorService.selectedPatient;
  }

  getAggregatedData() {
    const filters = {
      testNameID: this.selectedTest,
      timeRange: this.selectedTimeRange
    }

    // this.doctorService.getAggregateDate(filters).pipe(take(1)).subscribe(results => {
    //   this.aggregatedData = results;
    //   this.showTable = !!this.aggregatedData.length;;
    //   console.log(this.aggregatedData);
    // });
  }

  showTestDetails(value: AggregatedData) {
    console.log(value)
  }
}
