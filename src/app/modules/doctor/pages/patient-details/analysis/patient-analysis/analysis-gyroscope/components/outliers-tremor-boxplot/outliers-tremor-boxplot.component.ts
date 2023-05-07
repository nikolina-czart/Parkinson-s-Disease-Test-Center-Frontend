import {Component, Input, OnInit} from '@angular/core';
import {TremorAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/TremorAnalysis";
import {TremorGraphData} from "../../../../../../../../../models/analysis/finger-tapping/tremor-graph-data";

@Component({
  selector: 'app-outliers-tremor-boxplot',
  templateUrl: './outliers-tremor-boxplot.component.html',
  styleUrls: ['./outliers-tremor-boxplot.component.scss']
})
export class OutliersTremorBoxplotComponent implements OnInit {
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
    }
  }


}

