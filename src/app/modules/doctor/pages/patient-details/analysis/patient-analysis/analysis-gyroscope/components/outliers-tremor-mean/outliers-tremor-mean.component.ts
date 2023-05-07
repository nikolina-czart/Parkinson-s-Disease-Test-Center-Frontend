import {Component, Input, OnInit} from '@angular/core';
import {TremorAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/TremorAnalysis";
import {TremorGraphData} from "../../../../../../../../../models/analysis/finger-tapping/tremor-graph-data";

@Component({
  selector: 'app-outliers-tremor-mean',
  templateUrl: './outliers-tremor-mean.component.html',
  styleUrls: ['./outliers-tremor-mean.component.scss']
})
export class OutliersTremorMeanComponent implements OnInit {
  @Input() tremorData!: TremorAnalysis[];
  graphs: TremorGraphData[] = [];
  ngOnInit(): void {
    this.tremorData.forEach(element => {
      const meanXAxisX = this.createNumberArray(element.data.differenceMeanByDayX.dataBeforeMedLeft.length);
      const meanXAxisY = this.createNumberArray(element.data.differenceMeanByDayY.dataBeforeMedLeft.length);
      const meanXAxisZ = this.createNumberArray(element.data.differenceMeanByDayZ.dataBeforeMedLeft.length);

      const differenceMeanByDayX = this.getDataDifferenceX(element, meanXAxisX);
      const differenceMeanByDayY =  this.getDataDifferenceY(element, meanXAxisY);
      const differenceMeanByDayZ =  this.getDataDifferenceZ(element, meanXAxisZ);

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

  private getDataDifferenceX(element: TremorAnalysis, meanXAxisX: number[]) {
    return [
      this.createGraph(element.data.differenceMeanByDayX.dataBeforeMedLeft, meanXAxisX, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayX.dataBeforeMedRight, meanXAxisX, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayX.dataAfterMedLeft, meanXAxisX, "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayX.dataAfterMedRight, meanXAxisX, "Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataDifferenceY(element: TremorAnalysis, meanXAxisY: number[]) {
    return [
      this.createGraph(element.data.differenceMeanByDayY.dataBeforeMedLeft, meanXAxisY, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayY.dataBeforeMedRight, meanXAxisY, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayY.dataAfterMedLeft, meanXAxisY, "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayY.dataAfterMedRight, meanXAxisY, "Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataDifferenceZ(element: TremorAnalysis, meanXAxisZ: number[]) {
    return [
      this.createGraph(element.data.differenceMeanByDayZ.dataBeforeMedLeft, meanXAxisZ, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayZ.dataBeforeMedRight, meanXAxisZ, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayZ.dataAfterMedLeft, meanXAxisZ, "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.differenceMeanByDayZ.dataAfterMedRight, meanXAxisZ, "Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private createGraph(data: number[], x: number[], name:string, colorLine:string, colorPoint: string) {
    return {
      x: x,
      y: data,
      mode: 'lines+markers',
      name: name,
      marker: {
        color: colorPoint,
        size: 3
      },
      line: {
        color: colorLine,
        width: 1
      }
    }
  }

  private createNumberArray(length:number):number[] {
    const numberArray = [];
    for (let i = 0; i < length; i++) {
      numberArray.push(i);
    }
    return numberArray;
  }

  private createLayout(title: string, titleY: string) {
    return {
      title: title,
      yaxis: {
        title: titleY,
      },
      xaxis: {
        title: "Numer badania [-]",
      },
    }
  }
}
