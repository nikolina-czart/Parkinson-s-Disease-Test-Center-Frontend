import {Component, Input, OnInit} from '@angular/core';
import {TremorAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/TremorAnalysis";
import {TremorGraphData} from "../../../../../../../../../models/analysis/finger-tapping/tremor-graph-data";

@Component({
  selector: 'app-outliers-tremor-kde',
  templateUrl: './outliers-tremor-kde.component.html',
  styleUrls: ['./outliers-tremor-kde.component.css']
})
export class OutliersTremorKdeComponent implements OnInit {
  @Input() tremorData!: TremorAnalysis[];
  graphs: TremorGraphData[] = [];

  ngOnInit(): void {
    this.tremorData.forEach(element => {
      const differenceMeanByDayX = this.getDataDifferenceX(element);
      const differenceMeanByDayY =  this.getDataDifferenceY(element);
      const differenceMeanByDayZ =  this.getDataDifferenceZ(element);

      const layoutDifferenceX =  this.createLayout("Wartości odstające od średniej na osi x (średnie z dni)", "Prędkość kątowa [*/s]");
      const layoutDifferenceY =  this.createLayout("Wartości odstające od średniej na osi y (średnie z dni)", "Prędkość kątowa [*/s]");
      const layoutDifferenceZ =  this.createLayout("Wartości odstające od średniej na osi z  (średnie z dni)", "Prędkość kątowa [*/s]");

      this.graphs.push({
        period: element.period,
        meanByDayX: {
          data: [],
          layout: {}
        },
        meanByDayY: {
          data: [],
          layout: {}
        },
        meanByDayZ: {
          data: [],
          layout: {}
        },
        aggregatedMeanByDay: {
          data: [],
          layout: {}
        },
        differenceMeanByDayX: {
          data: differenceMeanByDayX,
          layout: layoutDifferenceX
        },
        differenceMeanByDayY: {
          data: differenceMeanByDayY,
          layout: layoutDifferenceY
        },
        differenceMeanByDayZ: {
          data: differenceMeanByDayZ,
          layout: layoutDifferenceZ
        }
      })
    })
  }

  private getDataDifferenceX(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.differenceMeanByDayX.dataBeforeMedLeft, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayX.dataBeforeMedRight, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayX.dataAfterMedLeft, "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayX.dataAfterMedRight, "Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataDifferenceY(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.differenceMeanByDayY.dataBeforeMedLeft, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayY.dataBeforeMedRight, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayY.dataAfterMedLeft, "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayY.dataAfterMedRight, "Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataDifferenceZ(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.differenceMeanByDayZ.dataBeforeMedLeft, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayZ.dataBeforeMedRight, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayZ.dataAfterMedLeft, "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayZ.dataAfterMedRight, "Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
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
    }
  }
}
