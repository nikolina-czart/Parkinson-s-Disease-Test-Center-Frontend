import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../../models/user/patient/patient";
import {Router} from "@angular/router";
import {DoctorService} from "../../services/doctor.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Result} from "../../../../models/results/result";
import {take} from "rxjs";
import {TestInformation} from "../../../../models/tests/test-information";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-patient-results',
  templateUrl: './patient-results.component.html',
  styleUrls: ['./patient-results.component.scss']
})
export class PatientResultsComponent implements OnInit{
  displayedColumns: string[] = ['testDate', 'side', 'medicineSupply'];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  selectedPatient!: Patient;
  selectedTest!: TestInformation;
  testResults!: Result[];
  showTable!: boolean;
  isSend: boolean = false;
  selectedResult!: Result;

  public chart = {
    data: [{}],
    layout: {}
  };
  isSelectedResult: boolean = false;
  isFingerTapping: boolean = false;

  constructor(private router: Router,
              private doctorService: DoctorService,
              private _snackBar: MatSnackBar) {
  }
  ngOnInit() {
    this.showTable = false;
    this.selectedPatient = this.doctorService.selectedPatient;
  }

  showPatientDetails(patient: Patient) {
    this.doctorService.setSelectedPatient(patient);
    this.router.navigate(['/browser-patient', patient.uid], {state: {patient: patient}})
  }

  getTestsResults() {
    this.isSelectedResult = false;
    this.showTable = false;
    const filters = {
      testNameID: this.selectedTest.uid,
      formDate: this.range.get('start')?.value?.toLocaleDateString('en-CA'),
      toDate: this.range.get('end')?.value?.toLocaleDateString('en-CA')
    }
    this.doctorService.getTest(filters).pipe(take(1)).subscribe(results => {
      this.testResults = results;
      this.showTable = !!this.testResults.length;
    })
  }


  showTestDetails(resulTest: Result) {
    this.selectedResult = resulTest;
    this.isSelectedResult = true;
    this.isSend = true;
    if(this.selectedTest.uid === "FINGER_TAPPING") {
      this.isFingerTapping = true;
    }else {
      this.isFingerTapping = false;
    }

    this.chartX();
  }

  chart3D() {
    this.chart = {
      data:
        [{x: this.selectedResult.accelData.x, y: this.selectedResult.accelData.y, z: this.selectedResult.accelData.z,
          type: "scatter3d", mode: "markers", marker: {color: 'red'} },
        ],
      layout: {
        title: "Graph 3D",
        xaxis: {
          title: "Position x",
        },
        yaxis: {
          title: "Position y"
        },
        zaxis: {
          title: "Position z"
        }
      }
    }
  };

  chartX() {
    this.setChart(
      this.selectedResult.accelData.timestamp,
      this.selectedResult.accelData.x,
      "scatter", "" +
      "Position chart X",
      "Time [s]",
      "Acceleration unit [m/s2]"
    )
  }

  chartY() {
    this.setChart(
      this.selectedResult.accelData.timestamp,
      this.selectedResult.accelData.y,
      "scatter", "" +
      "Position chart Y",
      "Czas [s]",
      "Acceleration unit [m/s2]"
    )
  }

  chartZ() {
    this.setChart(
      this.selectedResult.accelData.timestamp,
      this.selectedResult.accelData.z,
      "scatter", "" +
      "Position chart Z",
      "Time [s]",
      "Acceleration unit [m/s2]"
    )
  }

  chartUpDown() {
    const [time, upDown] = this.correctUpDown(this.selectedResult.tappingData.timestamp, this.selectedResult.tappingData.upDown)
    this.setChart(
      time,
      upDown,
      "scatter", "" +
      "Position chart X",
      "Time [s]",
      "Raise / lower fingers"
    )
  }

  private setChart(x: string[], y: string[], type: string, title: string, xaxis: string, yaxix: string):void {
    this.chart = {
      data: [
        { x: x, y: y, type: type, mode: 'lines+points', marker: {color: 'red'} },
      ],
      layout: { title: title,
        xaxis: {
          title: xaxis,
        },
        yaxis: {
          title: yaxix
        }}
    };
  }

  saveAllData() {
    this.doctorService.saveTestsToFile(this.selectedPatient, this.selectedTest.uid, this.testResults)
  }

  correctUpDown(timestamp: string[], upDown: string[]) {
    let timestampNew = [];
    let upDownNew = [];

    for (let i = 0; i < upDown.length-1; i++) {
      timestampNew.push(timestamp[i])
      upDownNew.push(upDown[i])

      if(upDown[i] !== upDown[i+1]){
        timestampNew.push(timestamp[i+1])
        upDownNew.push(upDown[i])
      }
    }

    return [timestampNew, upDownNew]
  }

  chartXFTT() {
    this.setChart(
      this.selectedResult.accelData.timestamp,
      this.selectedResult.accelData.x,
      "scatter", "" +
      "Position chart X",
      "Time [s]",
      "Acceleration unit [m/s2]"
    )
  }

  chartYFTT() {
    this.setChart(
      this.selectedResult.accelData.timestamp,
      this.selectedResult.accelData.y,
      "scatter", "" +
      "Position chart Y",
      "Czas [s]",
      "Acceleration unit [m/s2]"
    )
  }

  chartZFTT() {
    this.setChart(
      this.selectedResult.accelData.timestamp,
      this.selectedResult.accelData.z,
      "scatter", "" +
      "Position chart Z",
      "Time [s]",
      "Acceleration unit [m/s2]"
    )
  }

  chartXTremor() {
    this.setChart(
      this.selectedResult.accelData.timestamp,
      this.selectedResult.accelData.x,
      "scatter", "" +
      "Position chart X",
      "Time [s]",
      "Angular velocity [*/s]"
    )
  }

  chartYTremor() {
    this.setChart(
      this.selectedResult.accelData.timestamp,
      this.selectedResult.accelData.y,
      "scatter", "" +
      "Position chart Y",
      "Czas [s]",
      "Angular velocity [*/s]"
    )
  }

  chartZTremor() {
    this.setChart(
      this.selectedResult.accelData.timestamp,
      this.selectedResult.accelData.z,
      "scatter", "" +
      "Position chart Z",
      "Time [s]",
      "Angular velocity [*/s]"
    )
  }
}
