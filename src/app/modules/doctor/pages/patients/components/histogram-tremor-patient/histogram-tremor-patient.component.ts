import {Component, Input, OnInit} from '@angular/core';
import {MeanSummaryPatients} from "../../../../../../models/user/doctor/mean-summary-patiens";
import {MeanSummaryGraph} from "../../../../../../models/user/doctor/mean-summary-graph";

@Component({
  selector: 'app-histogram-tremor-patient',
  templateUrl: './histogram-tremor-patient.component.html',
  styleUrls: ['./histogram-tremor-patient.component.scss']
})
export class HistogramTremorPatientComponent implements OnInit {
  @Input() meanPatientData!: MeanSummaryPatients[];
  graphData!: MeanSummaryGraph;
  ngOnInit(): void {
    const patientBeforeMed = this.meanPatientData.find(e => e.group === "Pacjenci z PD - przed lekami")!.data;
    const patientAfterMed = this.meanPatientData.find(e => e.group === "Pacjenci z PD - po lekach")!.data;
    const controls = this.meanPatientData.find(e => e.group === "Pacjenci kontrolni")!.data;

    const graphData1Left = this.getGraphData(patientBeforeMed.meanX.dataLeft, patientAfterMed.meanX.dataLeft, controls.meanX.dataLeft);
    const graphData1Right = this.getGraphData(patientBeforeMed.meanX.dataRight, patientAfterMed.meanX.dataRight, controls.meanX.dataRight);
    const graphData2Left = this.getGraphData(patientBeforeMed.meanY.dataLeft, patientAfterMed.meanY.dataLeft, controls.meanY.dataLeft);
    const graphData2Right = this.getGraphData(patientBeforeMed.meanY.dataRight, patientAfterMed.meanY.dataRight, controls.meanY.dataRight);
    const graphData3Left = this.getGraphData(patientBeforeMed.meanZ.dataLeft, patientAfterMed.meanZ.dataLeft, controls.meanZ.dataLeft);
    const graphData3Right = this.getGraphData(patientBeforeMed.meanZ.dataRight, patientAfterMed.meanZ.dataRight, controls.meanZ.dataRight);
    const graphData4Left = this.getGraphData(patientBeforeMed.aggregated.dataLeft, patientAfterMed.aggregated.dataLeft, controls.aggregated.dataLeft);
    const graphData4Right = this.getGraphData(patientBeforeMed.aggregated.dataRight, patientAfterMed.aggregated.dataRight, controls.aggregated.dataRight);

    const layoutGraphData1Left = this.createLayout('Przyśpieszenie na osi x (średnie z dni)- Lewa ręka', 'Prędkość kątowa [*/s]');
    const layoutGraphData1Right = this.createLayout('Przyśpieszenie na osi x (średnie z dni) - Prawa ręka', 'Prędkość kątowa [*/s]');
    const layoutGraphData2Left = this.createLayout('Przyśpieszenie na osi y (średnie z dni) - Lewa ręka', 'Prędkość kątowa [*/s]');
    const layoutGraphData2Right = this.createLayout('Przyśpieszenie na osi y (średnie z dni) - Prawa ręka', 'Prędkość kątowa [*/s]');
    const layoutGraphData3Left = this.createLayout('Przyśpieszenie na osi z (średnie z dni) - Lewa ręka', 'Prędkość kątowa [*/s]');
    const layoutGraphData3Right = this.createLayout('Przyśpieszenie na osi z (średnie z dni) - Prawa ręka', 'Prędkość kątowa [*/s]');
    const layoutGraphData4Left = this.createLayout('Całkowite przyśpieszenie (średnie z dni) - Lewa ręka', 'Prędkość kątowa [*/s]');
    const layoutGraphData4Right = this.createLayout('Całkowite przyśpieszenie (średnie z dni) - Prawa ręka', 'Prędkość kątowa [*/s]');

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
