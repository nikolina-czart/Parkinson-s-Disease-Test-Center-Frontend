import {Component, Input, OnInit} from '@angular/core';
import {MeanSummaryPatients} from "../../../../../../models/user/doctor/mean-summary-patiens";
import {MeanSummaryGraph} from "../../../../../../models/user/doctor/mean-summary-graph";

@Component({
  selector: 'app-density-tremor-patient',
  templateUrl: './density-tremor-patient.component.html',
  styleUrls: ['./density-tremor-patient.component.scss']
})
export class DensityTremorPatientComponent implements OnInit {
  @Input() meanPatientData!: MeanSummaryPatients[];
  graphData!: MeanSummaryGraph;
  ngOnInit(): void {
    const patientBeforeMed = this.meanPatientData.find(e => e.group === "Patients with PD - Before medicines")!.data;
    const patientAfterMed = this.meanPatientData.find(e => e.group === "Patients with PD - After medication")!.data;
    const controls = this.meanPatientData.find(e => e.group === "Control patients")!.data;

    const graphData1Left = this.getGraphData(patientBeforeMed.meanX.dataLeft, patientAfterMed.meanX.dataLeft, controls.meanX.dataLeft);
    const graphData1Right = this.getGraphData(patientBeforeMed.meanX.dataRight, patientAfterMed.meanX.dataRight, controls.meanX.dataRight);
    const graphData2Left = this.getGraphData(patientBeforeMed.meanY.dataLeft, patientAfterMed.meanY.dataLeft, controls.meanY.dataLeft);
    const graphData2Right = this.getGraphData(patientBeforeMed.meanY.dataRight, patientAfterMed.meanY.dataRight, controls.meanY.dataRight);
    const graphData3Left = this.getGraphData(patientBeforeMed.meanZ.dataLeft, patientAfterMed.meanZ.dataLeft, controls.meanZ.dataLeft);
    const graphData3Right = this.getGraphData(patientBeforeMed.meanZ.dataRight, patientAfterMed.meanZ.dataRight, controls.meanZ.dataRight);
    const graphData4Left = this.getGraphData(patientBeforeMed.aggregated.dataLeft, patientAfterMed.aggregated.dataLeft, controls.aggregated.dataLeft);
    const graphData4Right = this.getGraphData(patientBeforeMed.aggregated.dataRight, patientAfterMed.aggregated.dataRight, controls.aggregated.dataRight);

    const layoutGraphData1Left = this.createLayout('Angular velocity on the x-axis (averages over days) - Left hand', 'Angular velocity [*/s]', [-0.4, 0.4]);
    const layoutGraphData1Right = this.createLayout('Angular velocity on the x-axis (averages over days)  - Right hand', 'Angular velocity [*/s]', [-0.4, 0.4]);
    const layoutGraphData2Left = this.createLayout('Angular velocity on the y-axis (averages over days)  - Left hand', 'Angular velocity [*/s]', [-1, 0.5]);
    const layoutGraphData2Right = this.createLayout('Angular velocity on the y-axis (averages over days)  - Right hand', 'Angular velocity [*/s]', [-1, 0.5]);
    const layoutGraphData3Left = this.createLayout('Angular velocity on the z-axis (averages over days)  - Left hand', 'Angular velocity [*/s]', [-0.4, 0.2]);
    const layoutGraphData3Right = this.createLayout('Angular velocity on the z-axis (averages over days)  - Right hand', 'Angular velocity [*/s]', [-0.4, 0.2]);
    const layoutGraphData4Left = this.createLayout('Length of angular velocity vector (average of days) - Left hand', 'Angular velocity [*/s]', [0, 3]);
    const layoutGraphData4Right = this.createLayout('Length of angular velocity vector (average of days) - Right hand', 'Angular velocity [*/s]', [0, 3]);

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
          data: graphData4Left,
          layout: layoutGraphData4Left
        },
        dataRight: {
          data: graphData4Right,
          layout: layoutGraphData4Right
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
