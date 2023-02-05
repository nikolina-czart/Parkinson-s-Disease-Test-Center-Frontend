import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../../models/user/patient/patient";
import {Router} from "@angular/router";
import {DoctorService} from "../../services/doctor.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Result} from "../../../../models/results/result";
import {take} from "rxjs";
import {TestType} from "../../../../models/tests/test-info";

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
  selectedTest!: string;
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
              private doctorService: DoctorService) {
  }
  ngOnInit() {
    this.showTable = false;
    this.selectedPatient = this.doctorService.selectedPatient;
    console.log(!!this.selectedTest && !!this.range.controls.start.value && !!this.range.controls.end.value)
  }

  showPatientDetails(patient: Patient) {
    this.doctorService.setSelectedPatient(patient);
    this.router.navigate(['/browser-patient', patient.uid], {state: {patient: patient}})
  }

  getTestsResults() {
    const filters = {
      testNameID: this.selectedTest,
      formDate: this.range.get('start')?.value?.toLocaleDateString('en-CA'),
      toDate: this.range.get('end')?.value?.toLocaleDateString('en-CA')
    }
    this.doctorService.getTest(filters).pipe(take(1)).subscribe(results => {
      this.testResults = results;
      this.showTable = !!this.testResults.length;
    })
  }

  resetFilters() {
    this.showTable = false;
    this.selectedTest = "";
    this.testResults = []
    this.range.reset();
    this.isSend = false;
  }

  showTestDetails(resulTest: Result) {
    console.log(resulTest)
    this.selectedResult = resulTest;
    this.isSelectedResult = true;
    this.isSend = true;
    if(this.selectedTest === TestType.FINGER_TAPPING) {
      this.isFingerTapping = true;
    }else {
      this.isFingerTapping = false;
    }
    this.chartX();
  }

  chart3D() {
    console.log("3D")
    this.chart = {
      data:
        [{x: this.selectedResult.x, y: this.selectedResult.y, z: this.selectedResult.z,
          type: "scatter3d", mode: "markers", marker: {color: 'red'} },
        ],
      layout: {
        title: "Wykres 3D",
        xaxis: {
          title: "Pozycja x",
        },
        yaxis: {
          title: "Pozycja y"
        },
        zaxis: {
          title: "Pozycja z"
        }
      }
    }
  };

  chartX() {
    this.setChart(
      this.selectedResult.timestamp,
      this.selectedResult.x,
      "scatter", "" +
      "Wykres pozycji X",
      "Czas [s]",
      "Jednostka przyśpieszenia [m/s2]"
    )
  }

  chartY() {
    this.setChart(
      this.selectedResult.timestamp,
      this.selectedResult.y,
      "scatter", "" +
      "Wykres pozycji Y",
      "Czas [s]",
      "Jednostka przyśpieszenia [m/s2]"
    )
  }

  chartZ() {
    this.setChart(
      this.selectedResult.timestamp,
      this.selectedResult.z,
      "scatter", "" +
      "Wykres pozycji Z",
      "Czas [s]",
      "Jednostka przyśpieszenia [m/s2]"
    )
  }

  chartUpDown() {
    this.setChart(
      this.selectedResult.timestampUpDown,
      this.selectedResult.upDown,
      "scatter", "" +
      "Wykres pozycji X",
      "Czas [s]",
      "Podniesienie / opuszczenia palce"
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
}
