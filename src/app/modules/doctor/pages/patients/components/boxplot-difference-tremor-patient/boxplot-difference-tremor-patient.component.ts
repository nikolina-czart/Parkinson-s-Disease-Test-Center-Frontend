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
    const patientBeforeMed = this.meanPatientData.find(e => e.group === "Pacjenci z PD - przed lekami")!.data;
    const patientAfterMed = this.meanPatientData.find(e => e.group === "Pacjenci z PD - po lekach")!.data;
    const controls = this.meanPatientData.find(e => e.group === "Pacjenci kontrolni")!.data;

    const differenceMeanXLeft = this.getGraphData(patientBeforeMed.differenceX.dataLeft, patientAfterMed.differenceX.dataLeft, controls.differenceX.dataLeft);
    const differenceMeanXRight = this.getGraphData(patientBeforeMed.differenceX.dataRight, patientAfterMed.differenceX.dataRight, controls.differenceX.dataRight);
    const differenceMeanYLeft = this.getGraphData(patientBeforeMed.differenceY.dataLeft, patientAfterMed.differenceY.dataLeft, controls.differenceY.dataLeft);
    const differenceMeanYRight = this.getGraphData(patientBeforeMed.differenceY.dataRight, patientAfterMed.differenceY.dataRight, controls.differenceY.dataRight);
    const differenceMeanZLeft = this.getGraphData(patientBeforeMed.differenceZ.dataLeft, patientAfterMed.differenceZ.dataLeft, controls.differenceZ.dataLeft);
    const differenceMeanZRight = this.getGraphData(patientBeforeMed.differenceZ.dataRight, patientAfterMed.differenceZ.dataRight, controls.differenceZ.dataRight);

    const layoutDifferenceXLeft = this.createLayout('Wartości odstające od średniej - oś X - Lewa ręka', 'Prędkość kątowa [*/s]');
    const layoutDifferenceXRight = this.createLayout('Wartości odstające od średniej - oś X - Prawa ręka', 'Prędkość kątowa [*/s]');
    const layoutDifferenceYLeft = this.createLayout('Wartości odstające od średniej - oś Y - Lewa ręka', 'Prędkość kątowa [*/s]');
    const layoutDifferenceYRight = this.createLayout('Wartości odstające od średniej - oś Y - Prawa ręka', 'Prędkość kątowa [*/s]');
    const layoutDifferenceZLeft = this.createLayout('Wartości odstające od średniej - oś Z - Lewa ręka', 'Prędkość kątowa [*/s]');
    const layoutDifferenceZRight = this.createLayout('Wartości odstające od średniej - oś Z - Prawa ręka', 'Prędkość kątowa [*/s]');

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
      this.createGraph(patientBeforeMed, "Pacjenci z PD - przed lekami", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(patientAfterMed, "Pacjenci z PD - po lekach", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(controls,"Pacjenci kontrolni", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
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

  private createLayout(title: string, titleY: string) {
    return {
      title: title,
      yaxis: {
        title: titleY,
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
