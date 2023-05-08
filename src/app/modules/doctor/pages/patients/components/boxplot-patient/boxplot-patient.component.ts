import {Component, Input, OnInit} from '@angular/core';
import {MeanSummaryGraph} from "../../../../../../models/user/doctor/mean-summary-graph";
import {MeanSummaryPatients} from "../../../../../../models/user/doctor/mean-summary-patiens";

@Component({
  selector: 'app-boxplot-patient',
  templateUrl: './boxplot-patient.component.html',
  styleUrls: ['./boxplot-patient.component.scss']
})
export class BoxplotPatientComponent  implements OnInit {
  @Input() meanPatientData!: MeanSummaryPatients[];
  graphData!: MeanSummaryGraph;
  ngOnInit(): void {
    const patientBeforeMed = this.meanPatientData.find(e => e.group === "Patients with PD - Before medicines")!.data;
    const patientAfterMed = this.meanPatientData.find(e => e.group === "Patients with PD - After medication")!.data;
    const controls = this.meanPatientData.find(e => e.group === "Control patients")!.data;

    const holdTimeLeft = this.getHoldTime(patientBeforeMed.touchTime.dataLeft, patientAfterMed.touchTime.dataLeft, controls.touchTime.dataLeft);
    const holdTimeRight = this.getHoldTime(patientBeforeMed.touchTime.dataRight, patientAfterMed.touchTime.dataRight, controls.touchTime.dataRight);
    const upTimeLeft = this.getHoldTime(patientBeforeMed.upTime.dataLeft, patientAfterMed.upTime.dataLeft, controls.upTime.dataLeft);
    const upTimeRight = this.getHoldTime(patientBeforeMed.upTime.dataRight, patientAfterMed.upTime.dataRight, controls.upTime.dataRight);
    const intervalIntertapLeft = this.getHoldTime(patientBeforeMed.intertapInterval.dataLeft, patientAfterMed.intertapInterval.dataLeft, controls.intertapInterval.dataLeft);
    const intervalIntertapRight = this.getHoldTime(patientBeforeMed.intertapInterval.dataRight, patientAfterMed.intertapInterval.dataRight, controls.intertapInterval.dataRight);

    const layoutHoldTimeLeft = this.createLayout('Hold Time - Left hand', 'HT [ms]', [0, 800]);
    const layoutHoldTimeRight = this.createLayout('Hold Time - Right hand', 'HT [ms]',[0, 800]);
    const layoutUpTimeLeft = this.createLayout('Up Time - Left hand', 'UT [ms]', [0, 600]);
    const layoutUpTimeRight = this.createLayout('Up Time - Right hand', 'UT [ms]', [0, 600]);
    const layoutIntervalIntertapLeft = this.createLayout('Intertap Invertal - Left hand', 'IIT [ms]', [0, 1000]);
    const layoutIntervalIntertapRight = this.createLayout('Intertap Invertal - Right hand', 'IIT [ms]',[0, 1000]);

    this.graphData = {
      graph1: {
        dataLeft: {
          data: holdTimeLeft,
          layout: layoutHoldTimeLeft
        },
        dataRight: {
          data: holdTimeRight,
          layout: layoutHoldTimeRight
        }
      },
      graph2: {
        dataLeft: {
          data: upTimeLeft,
          layout: layoutUpTimeLeft
        },
        dataRight: {
          data: upTimeRight,
          layout: layoutUpTimeRight
        }
      },
      graph3: {
        dataLeft: {
          data: intervalIntertapLeft,
          layout: layoutIntervalIntertapLeft
        },
        dataRight: {
          data: intervalIntertapRight,
          layout: layoutIntervalIntertapRight
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

  private getHoldTime(patientBeforeMed: number[], patientAfterMed: number[], controls: number[]) {
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
