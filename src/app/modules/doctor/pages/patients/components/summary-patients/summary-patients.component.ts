import {Component, Input, OnInit} from '@angular/core';
import {SummaryPatient} from "../../../../../../models/user/doctor/summary-patient";
import {Data} from "plotly.js-dist-min";

@Component({
  selector: 'app-summary-patients',
  templateUrl: './summary-patients.component.html',
  styleUrls: ['./summary-patients.component.scss']
})
export class SummaryPatientsComponent implements OnInit {
  displayedColumns: string[] = ['parameter', 'patientPD', 'patientControl'];

  @Input() summaryPatient!: SummaryPatient[]
  graphData!: Data[]
  graphLayout!: {}

  ngOnInit(): void {
    const patientPD = this.summaryPatient.find(e => e.parameter === "Liczba pacjentów")!.patientPD;
    const patientControl = this.summaryPatient.find(e => e.parameter === "Liczba pacjentów")!.patientControl;
    this.graphData = [{
      values: [patientPD, patientControl],
      labels: ['Pacjenci z PD', 'Pacjenci kontrolni'],
      type: 'pie',
      marker: {
        colors: ["rgba(204, 0, 102, 0.7)", "rgba(0, 102, 204, 0.7)"]
      },
    }]

    this.graphLayout = {
      title: "Zestawienie pacjentów"
    }
  }
}
