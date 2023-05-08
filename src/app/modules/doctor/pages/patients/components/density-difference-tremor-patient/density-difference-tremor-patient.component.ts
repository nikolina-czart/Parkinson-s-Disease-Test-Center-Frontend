import {Component, Input, OnInit} from '@angular/core';
import {MeanSummaryPatients} from "../../../../../../models/user/doctor/mean-summary-patiens";
import {MeanSummaryGraph} from "../../../../../../models/user/doctor/mean-summary-graph";

@Component({
  selector: 'app-density-difference-tremor-patient',
  templateUrl: './density-difference-tremor-patient.component.html',
  styleUrls: ['./density-difference-tremor-patient.component.scss']
})
export class DensityDifferenceTremorPatientComponent implements OnInit {
  @Input() meanPatientData!: MeanSummaryPatients[];
  graphData!: MeanSummaryGraph;
  ngOnInit(): void {
    const patientBeforeMed = this.meanPatientData.find(e => e.group === "Patients with PD - Before medicines")!.data;
    const patientAfterMed = this.meanPatientData.find(e => e.group === "Patients with PD - After medication")!.data;
    const controls = this.meanPatientData.find(e => e.group === "Control patients")!.data;

    const graphData1Left = this.getGraphData(patientBeforeMed.differenceX.dataLeft, patientAfterMed.differenceX.dataLeft, controls.differenceX.dataLeft);
    const graphData1Right = this.getGraphData(patientBeforeMed.differenceX.dataRight, patientAfterMed.differenceX.dataRight, controls.differenceX.dataRight);
    const graphData2Left = this.getGraphData(patientBeforeMed.differenceY.dataLeft, patientAfterMed.differenceY.dataLeft, controls.differenceY.dataLeft);
    const graphData2Right = this.getGraphData(patientBeforeMed.differenceY.dataRight, patientAfterMed.differenceY.dataRight, controls.differenceY.dataRight);
    const graphData3Left = this.getGraphData(patientBeforeMed.differenceZ.dataLeft, patientAfterMed.differenceZ.dataLeft, controls.differenceZ.dataLeft);
    const graphData3Right = this.getGraphData(patientBeforeMed.differenceZ.dataRight, patientAfterMed.differenceZ.dataRight, controls.differenceZ.dataRight);

    const layoutGraphData1Left = this.createLayout('Deviations from the mean on the x-axis (averages over days) - Left hand', 'Angular velocity [*/s]', [0,2]);
    const layoutGraphData1Right = this.createLayout('Deviations from the mean on the x-axis (averages over days) - Right hand', 'Angular velocity [*/s]', [0,2]);
    const layoutGraphData2Left = this.createLayout('Deviations from the mean on the y-axis (averages over days) - Left hand', 'Angular velocity [*/s]', [0,3]);
    const layoutGraphData2Right = this.createLayout('Deviations from the mean on the y-axis (averages over days) - Right hand', 'Angular velocity [*/s]', [0,3]);
    const layoutGraphData3Left = this.createLayout('Deviations from the mean on the z-axis (averages over days) - Left hand', 'Angular velocity [*/s]', [0,1]);
    const layoutGraphData3Right = this.createLayout('Deviations from the mean on the z-axis (averages over days) - Right hand', 'Angular velocity [*/s]', [0,1]);

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
      }
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
        y:-1
      }
    }
  }
}
