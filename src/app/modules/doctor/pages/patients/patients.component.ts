import {Component, Input, OnInit} from '@angular/core';
import {SummaryPatient} from "../../../../models/user/doctor/summary-patient";
import {MeanSummaryParameterDetails, MeanSummaryPatients} from "../../../../models/user/doctor/mean-summary-patiens";
import {DoctorService} from "../../services/doctor.service";
import {take} from "rxjs";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  summaryPatient!: SummaryPatient[]
  meanPatientData!: MeanSummaryPatients[]
  showSummaryData = false;
  showMeanSummaryData = false;

  constructor(private readonly doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.doctorService.getSummaryData().pipe(take(1)).subscribe(data => {
      console.log("summary: ", data)
      this.summaryPatient = data;
      this.showSummaryData = true;
    })
    this.doctorService.getMeanSummaryData().pipe(take(1)).subscribe(data => {
      this.meanPatientData = data;
      this.showMeanSummaryData = true;
      console.log("mean: ",data)
    })

    // this.meanPatientData =
    //   [
    //     {
    //       group: "Patients with PD - Before medicines",
    //       data: {
    //         touchTime: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         upTime: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         intertapInterval: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         meanX: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         meanY: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         meanZ: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         aggregated: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         differenceX: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         differenceY: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         differenceZ: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         }
    //       }
    //     },
    //     {
    //       group: "Patients with PD - After medication",
    //       data: {
    //         touchTime: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         upTime: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         intertapInterval: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         meanX: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         meanY: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         meanZ: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         aggregated: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         differenceX: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         differenceY: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         differenceZ: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         }
    //       }
    //     },
    //     {
    //       group: "Control patients",
    //       data: {
    //         touchTime: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         upTime: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         intertapInterval: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         meanX: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         meanY: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         meanZ: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         aggregated: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         differenceX: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         differenceY: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         },
    //         differenceZ: {
    //           dataLeft: [2, 4, 5, 6],
    //           dataRight: [1, 4, 6, 7]
    //         }
    //       }
    //     }]
  }

}
