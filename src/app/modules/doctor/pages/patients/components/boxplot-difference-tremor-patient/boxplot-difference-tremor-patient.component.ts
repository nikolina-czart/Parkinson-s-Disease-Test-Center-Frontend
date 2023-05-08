import {Component, Input, OnInit} from '@angular/core';
import {MeanSummaryPatients} from "../../../../../../models/user/doctor/mean-summary-patiens";
import {MeanSummaryGraph} from "../../../../../../models/user/doctor/mean-summary-graph";

@Component({
  selector: 'app-boxplot-difference-tremor-patient',
  templateUrl: './boxplot-difference-tremor-patient.component.html',
  styleUrls: ['./boxplot-difference-tremor-patient.component.scss']
})
export class BoxplotDifferenceTremorPatientComponent  implements OnInit {
  @Input() meanPatientData!: MeanSummaryPatients[];
  graphData!: MeanSummaryGraph;
  ngOnInit(): void {
    const patientBeforeMed = this.meanPatientData.find(e => e.group === "Patients with PD - Before medicines")!.data;
    const patientAfterMed = this.meanPatientData.find(e => e.group === "Patients with PD - After medication")!.data;
    const controls = this.meanPatientData.find(e => e.group === "Control patients")!.data;

    const differenceMeanXLeft = this.getGraphData(patientBeforeMed.differenceX.dataLeft, patientAfterMed.differenceX.dataLeft, controls.differenceX.dataLeft);
    const differenceMeanXRight = this.getGraphData(patientBeforeMed.differenceX.dataRight, patientAfterMed.differenceX.dataRight, controls.differenceX.dataRight);
    const differenceMeanYLeft = this.getGraphData(patientBeforeMed.differenceY.dataLeft, patientAfterMed.differenceY.dataLeft, controls.differenceY.dataLeft);
    const differenceMeanYRight = this.getGraphData(patientBeforeMed.differenceY.dataRight, patientAfterMed.differenceY.dataRight, controls.differenceY.dataRight);
    const differenceMeanZLeft = this.getGraphData(patientBeforeMed.differenceZ.dataLeft, patientAfterMed.differenceZ.dataLeft, controls.differenceZ.dataLeft);
    const differenceMeanZRight = this.getGraphData(patientBeforeMed.differenceZ.dataRight, patientAfterMed.differenceZ.dataRight, controls.differenceZ.dataRight);

    const layoutDifferenceXLeft = this.createLayout('Deviations from the mean on the x-axis (averages over days) - Left hand', 'Angular velocity [*/s]', [0, 2]);
    const layoutDifferenceXRight = this.createLayout('Deviations from the mean on the x-axis (averages over days) - Right hand', 'Angular velocity [*/s]', [0, 2]);
    const layoutDifferenceYLeft = this.createLayout('Deviations from the mean on the y-axis (averages over days) - Left hand', 'Angular velocity [*/s]', [0, 2]);
    const layoutDifferenceYRight = this.createLayout('Deviations from the mean on the y-axis (averages over days) - Right hand', 'Angular velocity [*/s]', [0, 2]);
    const layoutDifferenceZLeft = this.createLayout('Deviations from the mean on the z-axis (averages over days) - Left hand', 'Angular velocity [*/s]', [0, 1]);
    const layoutDifferenceZRight = this.createLayout('Deviations from the mean on the z-axis (averages over days) - Right hand', 'Angular velocity [*/s]', [0, 1]);

    this.graphData = {
      graph1: {
        dataLeft: {
          data: differenceMeanXLeft,
          layout: layoutDifferenceXLeft
        },
        dataRight: {
          data: differenceMeanXRight,
          layout: layoutDifferenceXRight
        }
      },
      graph2: {
        dataLeft: {
          data: differenceMeanYLeft,
          layout: layoutDifferenceYLeft
        },
        dataRight: {
          data: differenceMeanYRight,
          layout: layoutDifferenceYRight
        }
      },
      graph3: {
        dataLeft: {
          data: differenceMeanZLeft,
          layout: layoutDifferenceZLeft
        },
        dataRight: {
          data: differenceMeanZRight,
          layout: layoutDifferenceZRight
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
      }
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
      y: data,
      type: 'box',
      name: name,
      marker: {
        color: colorPoint,
        line: {
          color:  colorLine,
          width: 1
        }
      },
      opacity: 0.5,
      boxpoints: 'Outliers'
    }
  }

  private createLayout(title: string, titleY: string, range: number[]) {
    return {
      title: title,
      yaxis: {
        title: titleY,
        range: range
      },
      xaxis: {
        showticklabels: false
      },
      showlegend: true,
      legend: {
        "orientation": "h"
      }
    }
  }
}
