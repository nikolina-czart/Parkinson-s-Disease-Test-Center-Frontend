import {Component, Input, OnInit} from '@angular/core';
import {TremorAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/TremorAnalysis";
import {TremorGraphData} from "../../../../../../../../../models/analysis/finger-tapping/tremor-graph-data";

@Component({
  selector: 'app-histogram-tremor',
  templateUrl: './histogram-tremor.component.html',
  styleUrls: ['./histogram-tremor.component.scss']
})
export class HistogramTremorComponent implements OnInit{
  @Input() tremorData!: TremorAnalysis[];
  graphs: TremorGraphData[] = [];

  ngOnInit(): void {
    this.tremorData.forEach(element => {
      const meanX = this.getDataMeanX(element);
      const meanY =  this.getDataMeanY(element);
      const meanZ =  this.getDataMeanZ(element);
      const aggregatedXYZ =  this.getDataAggregatedXYZ(element);

      const layoutMeanXMean =  this.createLayout("Angular velocity on the x-axis (averages over days)", "Angular velocity [*/s]");
      const layoutMeanYMean =  this.createLayout("Angular velocity on the y-axis (averages over days)", "Angular velocity [*/s]");
      const layoutMeanZMean =  this.createLayout("Angular velocity on the z-axis (averages over days)", "Angular velocity [*/s]");
      const layoutAggregatedXYZ =  this.createLayout("Length of angular velocity vector (average of days)", "Angular velocity [*/s]");

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
      this.createGraph(element.data.meanByDayX.dataBeforeMedLeft,"Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", -0.5, 0.5, 0.02),
      this.createGraph(element.data.meanByDayX.dataBeforeMedRight,"Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", -0.5, 0.5, 0.02),
      this.createGraph(element.data.meanByDayX.dataAfterMedLeft, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", -0.5, 0.5, 0.02),
      this.createGraph(element.data.meanByDayX.dataAfterMedRight,"After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", -0.5, 0.5, 0.02),
    ]
  }

  private getDataMeanY(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.meanByDayY.dataBeforeMedLeft, "Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", -1, 0.2, 0.02),
      this.createGraph(element.data.meanByDayY.dataBeforeMedRight,  "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", -1, 0.2, 0.02),
      this.createGraph(element.data.meanByDayY.dataAfterMedLeft,  "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", -1, 0.2, 0.02),
      this.createGraph(element.data.meanByDayY.dataAfterMedRight, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", -1, 0.2, 0.02),
    ]
  }

  private getDataMeanZ(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.meanByDayZ.dataBeforeMedLeft,"Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", -0.5, 0.5, 0.02),
      this.createGraph(element.data.meanByDayZ.dataBeforeMedRight, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", -0.5, 0.5, 0.02),
      this.createGraph(element.data.meanByDayZ.dataAfterMedLeft, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", -0.5, 0.5, 0.02),
      this.createGraph(element.data.meanByDayZ.dataAfterMedRight, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", -0.5, 0.5, 0.02),
    ]
  }

  private getDataAggregatedXYZ(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.aggregatedMeanByDay.dataBeforeMedLeft,"Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", 0, 4, 0.1),
      this.createGraph(element.data.aggregatedMeanByDay.dataBeforeMedRight, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", 0, 4, 0.1),
      this.createGraph(element.data.aggregatedMeanByDay.dataAfterMedLeft, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", 0, 4, 0.1),
      this.createGraph(element.data.aggregatedMeanByDay.dataAfterMedRight, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", 0, 4, 0.1),
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
        title: "Value"
      },
      yaxis: {
        title: "Count"
      },
      bargap: 0.01,
      bargroupgap: 0.1,
      barmode: "overlay",
    }
  }
}
