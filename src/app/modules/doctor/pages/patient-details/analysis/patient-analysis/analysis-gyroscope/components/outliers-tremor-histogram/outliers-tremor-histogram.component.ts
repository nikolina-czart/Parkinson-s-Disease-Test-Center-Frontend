import {Component, Input, OnInit} from '@angular/core';
import {TremorAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/TremorAnalysis";
import {TremorGraphData} from "../../../../../../../../../models/analysis/finger-tapping/tremor-graph-data";

@Component({
  selector: 'app-outliers-tremor-histogram',
  templateUrl: './outliers-tremor-histogram.component.html',
  styleUrls: ['./outliers-tremor-histogram.component.scss']
})
export class OutliersTremorHistogramComponent implements OnInit{
  @Input() tremorData!: TremorAnalysis[];
  graphs: TremorGraphData[] = [];

  ngOnInit(): void {
    this.tremorData.forEach(element => {
      const differenceMeanByDayX = this.getDataDifferenceX(element);
      const differenceMeanByDayY =  this.getDataDifferenceY(element);
      const differenceMeanByDayZ =  this.getDataDifferenceZ(element);

      const layoutDifferenceX =  this.createLayout("Deviations from the mean on the x-axis (averages over days)", "Angular velocity [*/s]");
      const layoutDifferenceY =  this.createLayout("Deviations from the mean on the y-axis (averages over days)", "Angular velocity [*/s]");
      const layoutDifferenceZ =  this.createLayout("Deviations from the mean on the z-axis (averages over days)", "Angular velocity [*/s]");

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
      this.createGraph(element.data.differenceMeanByDayX.dataBeforeMedLeft, "Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", 0, 2, 0.1),
      this.createGraph(element.data.differenceMeanByDayX.dataBeforeMedRight, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", 0, 2, 0.1),
      this.createGraph(element.data.differenceMeanByDayX.dataAfterMedLeft, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", 0, 2, 0.1),
      this.createGraph(element.data.differenceMeanByDayX.dataAfterMedRight, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", 0, 2, 0.1),
    ]
  }

  private getDataDifferenceY(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.differenceMeanByDayY.dataBeforeMedLeft, "Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", 0, 3, 0.1),
      this.createGraph(element.data.differenceMeanByDayY.dataBeforeMedRight, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", 0, 3, 0.1),
      this.createGraph(element.data.differenceMeanByDayY.dataAfterMedLeft, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", 0, 3, 0.1),
      this.createGraph(element.data.differenceMeanByDayY.dataAfterMedRight, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", 0, 3, 0.1),
    ]
  }

  private getDataDifferenceZ(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.differenceMeanByDayZ.dataBeforeMedLeft, "Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", 0, 2, 0.1),
      this.createGraph(element.data.differenceMeanByDayZ.dataBeforeMedRight, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", 0, 2, 0.1),
      this.createGraph(element.data.differenceMeanByDayZ.dataAfterMedLeft, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", 0, 2, 0.1),
      this.createGraph(element.data.differenceMeanByDayZ.dataAfterMedRight, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", 0, 2, 0.1),
    ]
  }

  private createGraph(data: number[], name:string, colorLine:string, colorPoint: string, start: number, end:number, size:number) {
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
      xbins: {
        end: end,
        size: size,
        start: start
      }
    }
  }

  private createLayout(title: string, titleY: string) {
    return {
      title: title,
      xaxis: {
        title: "Przyśpieszenie kątowe"
      },
      yaxis: {
        title: "Suma"
      },
      bargap: 0.01,
      bargroupgap: 0.1,
      barmode: "overlay",
    }
  }
}
