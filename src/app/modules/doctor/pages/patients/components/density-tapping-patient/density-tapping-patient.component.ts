import {Component, Input, OnInit} from '@angular/core';
import {MeanSummaryPatients} from "../../../../../../models/user/doctor/mean-summary-patiens";
import {MeanSummaryGraph} from "../../../../../../models/user/doctor/mean-summary-graph";

@Component({
  selector: 'app-density-tapping-patient',
  templateUrl: './density-tapping-patient.component.html',
  styleUrls: ['./density-tapping-patient.component.scss']
})
export class DensityTappingPatientComponent implements OnInit {
  @Input() meanPatientData!: MeanSummaryPatients[];
  graphData!: MeanSummaryGraph;
  ngOnInit(): void {
    const patientBeforeMed = this.meanPatientData.find(e => e.group === "Patients with PD - Before medicines")!.data;
    const patientAfterMed = this.meanPatientData.find(e => e.group === "Patients with PD - After medication")!.data;
    const controls = this.meanPatientData.find(e => e.group === "Control patients")!.data;

    const graphData1Left = this.getGraphData(patientBeforeMed.touchTime.dataLeft, patientAfterMed.touchTime.dataLeft, controls.touchTime.dataLeft);
    const graphData1Right = this.getGraphData(patientBeforeMed.touchTime.dataRight, patientAfterMed.touchTime.dataRight, controls.touchTime.dataRight);
    const graphData2Left = this.getGraphData(patientBeforeMed.upTime.dataLeft, patientAfterMed.upTime.dataLeft, controls.upTime.dataLeft);
    const graphData2Right = this.getGraphData(patientBeforeMed.upTime.dataRight, patientAfterMed.upTime.dataRight, controls.upTime.dataRight);
    const graphData3Left = this.getGraphData(patientBeforeMed.intertapInterval.dataLeft, patientAfterMed.intertapInterval.dataLeft, controls.intertapInterval.dataLeft);
    const graphData3Right = this.getGraphData(patientBeforeMed.intertapInterval.dataRight, patientAfterMed.intertapInterval.dataRight, controls.intertapInterval.dataRight);

    const layoutGraphData1Left = this.createLayout('Hold time (averages over days) - Left hand', 'HT [ms]', [0, 800]);
    const layoutGraphData1Right = this.createLayout('Hold time (averages over days) - Right hand', 'HT [ms]', [0, 800]);
    const layoutGraphData2Left = this.createLayout('Up time (averages over days) - Left hand', 'UT [ms]', [0, 600]);
    const layoutGraphData2Right = this.createLayout('Up time (averages over days) - Right hand', 'UT [ms]', [0, 600]);
    const layoutGraphData3Left = this.createLayout('Intertap interval time (averages over days) - Left hand', 'IIT [ms]', [0, 1000]);
    const layoutGraphData3Right = this.createLayout('Intertap interval time (averages over days) - Right hand', 'IIT [ms]', [0, 1000]);

    this.graphData = {
      graph1: {
        dataLeft: {
          data: graphData1Left,
          layout: layoutGraphData1Left
        },
        dataRight: {
          data: graphData1Right,
          layout: layoutGraphData1Right
        }
      },
      graph2: {
        dataLeft: {
          data: graphData2Left,
          layout: layoutGraphData2Left
        },
        dataRight: {
          data: graphData2Right,
          layout: layoutGraphData2Right
        }
      },
      graph3: {
        dataLeft: {
          data: graphData3Left,
          layout: layoutGraphData3Left
        },
        dataRight: {
          data: graphData3Right,
          layout: layoutGraphData3Right
        }
      },
      graph4: {
        dataLeft: {
          data: [],
          layout: {}
        },
        dataRight: {
          data: [],
          layout: {}
        }
      },
    }
  }

  private getGraphData(patientBeforeMed: number[], patientAfterMed: number[], controls: number[]) {
    return [
      this.createGraph(patientBeforeMed, "Patients with PD - Before medicines", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(patientAfterMed, "Patients with PD - After medication", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(controls,"Control patients", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private createGraph(data: number[], name:string, colorLine:string, colorPoint: string) {
    return {
      x: data,
      type: 'violin',
      y0: "Dane",
      legendgroup: name,
      scalegroup: 'Scale group',
      name: name,
      side: 'positive',
      box: {
        visible: false
      },
      line: {
        color: colorPoint,
        width: 2
      },
      meanline: {
        visible: false
      },
    }
  }

  private createLayout(title: string, titleX: string, range: number[]) {
    return {
      title: title,
      xaxis: {
        title: titleX,
        range: range
      },
      yaxis: {
        title: "Probability density function",
        showticklabels: false
      },
      showlegend: true,
      legend: {
        x:0,
        y:-0.8
      }
    }
  }
}
