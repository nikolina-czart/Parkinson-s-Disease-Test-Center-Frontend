import {Component, Input, OnInit} from '@angular/core';
import {SummaryPatient} from "../../../../models/user/doctor/summary-patient";
import {MeanSummaryParameterDetails, MeanSummaryPatients} from "../../../../models/user/doctor/mean-summary-patiens";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  summaryPatient!: SummaryPatient[]
  meanPatientData!: MeanSummaryPatients[]

  ngOnInit(): void {
    this.summaryPatient = [
      {
        parameter: "Liczba pacjentów",
        patientPD: 2,
        patientControl: 5
      },
      {
        parameter: "Liczba testów: finger tapping",
        patientPD: 100,
        patientControl: 200
      },
      {
        parameter: "Liczba testów na stronę: finger tapping ",
        patientPD: 50,
        patientControl: 100
      },
      {
        parameter: "Liczba testów: drżenie rąk",
        patientPD: 100,
        patientControl: 200
      },
      {
        parameter: "Liczba testów na stronę: drżenie rąk",
        patientPD: 50,
        patientControl: 100
      },
    ]

    this.meanPatientData =
      [
        {
          group: "Pacjenci z PD - przed lekami",
          data: {
            touchTime: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            upTime: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            intertapInterval: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            meanX: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            meanY: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            meanZ: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            aggregated: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            differenceX: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            differenceY: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            differenceZ: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            }
          }
        },
        {
          group: "Pacjenci z PD - po lekach",
          data: {
            touchTime: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            upTime: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            intertapInterval: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            meanX: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            meanY: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            meanZ: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            aggregated: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            differenceX: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            differenceY: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            differenceZ: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            }
          }
        },
        {
          group: "Pacjenci kontrolni",
          data: {
            touchTime: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            upTime: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            intertapInterval: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            meanX: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            meanY: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            meanZ: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            aggregated: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            differenceX: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            differenceY: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            },
            differenceZ: {
              dataLeft: [2, 4, 5, 6],
              dataRight: [1, 4, 6, 7]
            }
          }
        }]
  }

}
