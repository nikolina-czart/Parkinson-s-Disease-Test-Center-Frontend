import {Component, Input, OnInit} from '@angular/core';
import {MeanSummaryPatients} from "../../../../../../models/user/doctor/mean-summary-patiens";
import {MeanSummaryGraph} from "../../../../../../models/user/doctor/mean-summary-graph";

@Component({
  selector: 'app-histogram-difference-tremor-patient',
  templateUrl: './histogram-difference-tremor-patient.component.html',
  styleUrls: ['./histogram-difference-tremor-patient.component.scss']
})
export class HistogramDifferenceTremorPatientComponent implements OnInit {
  @Input() meanPatientData!: MeanSummaryPatients[];
  graphData!: MeanSummaryGraph;
  ngOnInit(): void {
    const patientBeforeMed = this.meanPatientData.find(e => e.group === "Pacjenci z PD - przed lekami")!.data;
    const patientAfterMed = this.meanPatientData.find(e => e.group === "Pacjenci z PD - po lekach")!.data;
    const controls = this.meanPatientData.find(e => e.group === "Pacjenci kontrolni")!.data;

    const graphData1Left = this.getGraphData(patientBeforeMed.differenceX.dataLeft, patientAfterMed.differenceX.dataLeft, controls.differenceX.dataLeft);
    const graphData1Right = this.getGraphData(patientBeforeMed.differenceX.dataRight, patientAfterMed.differenceX.dataRight, controls.differenceX.dataRight);
    const graphData2Left = this.getGraphData(patientBeforeMed.differenceY.dataLeft, patientAfterMed.differenceY.dataLeft, controls.differenceY.dataLeft);
    const graphData2Right = this.getGraphData(patientBeforeMed.differenceY.dataRight, patientAfterMed.differenceY.dataRight, controls.differenceY.dataRight);
    const graphData3Left = this.getGraphData(patientBeforeMed.differenceZ.dataLeft, patientAfterMed.differenceZ.dataLeft, controls.differenceZ.dataLeft);
    const graphData3Right = this.getGraphData(patientBeforeMed.differenceZ.dataRight, patientAfterMed.differenceZ.dataRight, controls.differenceZ.dataRight);

    const layoutGraphData1Left = this.createLayout('Wartości odstające od średniej - oś X - Lewa ręka', 'Prędkość kątowa [*/s]');
    const layoutGraphData1Right = this.createLayout('Wartości odstające od średniej - oś X - Prawa ręka', 'Prędkość kątowa [*/s]');
    const layoutGraphData2Left = this.createLayout('Wartości odstające od średniej - oś Y - Lewa ręka', 'Prędkość kątowa [*/s]');
    const layoutGraphData2Right = this.createLayout('Wartości odstające od średniej - oś Y - Prawa ręka', 'Prędkość kątowa [*/s]');
    const layoutGraphData3Left = this.createLayout('Wartości odstające od średniej - oś Z - Lewa ręka', 'Prędkość kątowa [*/s]');
    const layoutGraphData3Right = this.createLayout('Wartości odstające od średniej - oś Z - Prawa ręka', 'Prędkość kątowa [*/s]');

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
      this.createGraph(patientBeforeMed, "Pacjenci z PD - przed lekami", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(patientAfterMed, "Pacjenci z PD - po lekach", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(controls,"Pacjenci kontrolni", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private createGraph(data: number[], name:string, colorLine:string, colorPoint: string) {
    return {
      x: data,
      type: 'histogram',
      name: name,
      marker: {
        color: colorPoint,
        line: {
          color:  colorLine,
          width: 1
        }
      },
      opacity: 0.5,
      nbinsx: 20
    }
  }

  private createLayout(title: string, titleX: string) {
    return {
      title: title,
      xaxis: {
        title: titleX
      },
      yaxis: {
        title: "Ilość wystąpień"
      },
      bargap: 0.01,
      bargroupgap: 0.1,
      barmode: "overlay",
      showlegend: true,
      legend: {
        x:0,
        y:-0.6
      }
    }
  }
}
