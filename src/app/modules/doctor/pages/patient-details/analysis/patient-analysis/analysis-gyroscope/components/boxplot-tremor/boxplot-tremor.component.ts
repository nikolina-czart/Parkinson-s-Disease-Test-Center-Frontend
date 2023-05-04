import {Component, Input, OnInit} from '@angular/core';
import {TremorAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/TremorAnalysis";
import {TremorGraphData} from "../../../../../../../../../models/analysis/finger-tapping/tremor-graph-data";

@Component({
  selector: 'app-boxplot-tremor',
  templateUrl: './boxplot-tremor.component.html',
  styleUrls: ['./boxplot-tremor.component.css']
})
export class BoxplotTremorComponent implements OnInit {
  @Input() tremorData!: TremorAnalysis[];
  graphs: TremorGraphData[] = [];

  ngOnInit(): void {
    this.tremorData.forEach(element => {
      const meanX = this.getDataMeanX(element);
      const meanY =  this.getDataMeanY(element);
      const meanZ =  this.getDataMeanZ(element);
      const aggregatedXYZ =  this.getDataAggregatedXYZ(element);

      const layoutMeanXMean =  this.createLayout("Przyśpieszenie na osi x (średnie z dni)", "Prędkość kątowa [*/s]");
      const layoutMeanYMean =  this.createLayout("Przyśpieszenie na osi y (średnie z dni)", "Prędkość kątowa [*/s]");
      const layoutMeanZMean =  this.createLayout("Przyśpieszenie na osi z  (średnie z dni)", "Prędkość kątowa [*/s]");
      const layoutAggregatedXYZ =  this.createLayout("Całkowite przyśpieszenie (średnie z dni)", "Prędkość kątowa [*/s]");

      this.graphs.push({
        period: element.period,
        meanByDayX: {
          data: meanX,
          layout: layoutMeanXMean
        },
        meanByDayY: {
          data: meanY,
          layout: layoutMeanYMean
        },
        meanByDayZ: {
          data: meanZ,
          layout: layoutMeanZMean
        },
        aggregatedMeanByDay: {
          data: aggregatedXYZ,
          layout: layoutAggregatedXYZ
        },
        differenceMeanByDayX: {
          data: [],
          layout: {}
        },
        differenceMeanByDayY: {
          data: [],
          layout: {}
        },
        differenceMeanByDayZ: {
          data: [],
          layout: {}
        }
      })
    })
  }

  private getDataMeanX(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.meanByDayX.dataBeforeMedLeft,"Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.meanByDayX.dataBeforeMedRight,"Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.meanByDayX.dataAfterMedLeft, "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.meanByDayX.dataAfterMedRight,"Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataMeanY(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.meanByDayY.dataBeforeMedLeft, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.meanByDayY.dataBeforeMedRight,  "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.meanByDayY.dataAfterMedLeft,  "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.meanByDayY.dataAfterMedRight, "Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataMeanZ(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.meanByDayZ.dataBeforeMedLeft,"Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.meanByDayZ.dataBeforeMedRight, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.meanByDayZ.dataAfterMedLeft, "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.meanByDayZ.dataAfterMedRight, "Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataAggregatedXYZ(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.aggregatedMeanByDay.dataBeforeMedLeft,"Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.aggregatedMeanByDay.dataBeforeMedRight, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.aggregatedMeanByDay.dataAfterMedLeft, "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.aggregatedMeanByDay.dataAfterMedRight, "Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
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
