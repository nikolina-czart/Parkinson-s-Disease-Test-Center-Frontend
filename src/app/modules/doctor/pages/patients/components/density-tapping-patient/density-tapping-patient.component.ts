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
    const patientBeforeMed = this.meanPatientData.find(e => e.group === "Pacjenci z PD - przed lekami")!.data;
    const patientAfterMed = this.meanPatientData.find(e => e.group === "Pacjenci z PD - po lekach")!.data;
    const controls = this.meanPatientData.find(e => e.group === "Pacjenci kontrolni")!.data;

    const graphData1Left = this.getGraphData(patientBeforeMed.touchTime.dataLeft, patientAfterMed.touchTime.dataLeft, controls.touchTime.dataLeft);
    const graphData1Right = this.getGraphData(patientBeforeMed.touchTime.dataRight, patientAfterMed.touchTime.dataRight, controls.touchTime.dataRight);
    const graphData2Left = this.getGraphData(patientBeforeMed.upTime.dataLeft, patientAfterMed.upTime.dataLeft, controls.upTime.dataLeft);
    const graphData2Right = this.getGraphData(patientBeforeMed.upTime.dataRight, patientAfterMed.upTime.dataRight, controls.upTime.dataRight);
    const graphData3Left = this.getGraphData(patientBeforeMed.intertapInterval.dataLeft, patientAfterMed.intertapInterval.dataLeft, controls.intertapInterval.dataLeft);
    const graphData3Right = this.getGraphData(patientBeforeMed.intertapInterval.dataRight, patientAfterMed.intertapInterval.dataRight, controls.intertapInterval.dataRight);

    const layoutGraphData1Left = this.createLayout('Hold time (średnie z dni) - Lewa ręka', 'HT [ms]');
    const layoutGraphData1Right = this.createLayout('Hold time (średnie z dni) - Prawa ręka', 'HT [ms]');
    const layoutGraphData2Left = this.createLayout('Up time (średnie z dni) - Lewa ręka', 'UT [ms]');
    const layoutGraphData2Right = this.createLayout('Up time (średnie z dni) - Prawa ręka', 'UT [ms]');
    const layoutGraphData3Left = this.createLayout('Intertap interval time (średnie z dni) - Lewa ręka', 'IIT [ms]');
    const layoutGraphData3Right = this.createLayout('Intertap interval time (średnie z dni) - Prawa ręka', 'IIT [ms]');

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

  private createLayout(title: string, titleX: string) {
    return {
      title: title,
      xaxis: {
        title: titleX
      },
      yaxis: {
        title: "Wykres gętości prawdopodobieństwa",
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
