import {Component, Input, OnInit} from '@angular/core';
import {TremorAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/TremorAnalysis";
import {TremorGraphData} from "../../../../../../../../../models/analysis/finger-tapping/tremor-graph-data";

@Component({
  selector: 'app-kde-tremor',
  templateUrl: './kde-tremor.component.html',
  styleUrls: ['./kde-tremor.component.scss']
})
export class KdeTremorComponent implements OnInit {
  @Input() tremorData!: TremorAnalysis[];
  graphs: TremorGraphData[] = [];

  ngOnInit(): void {
    this.tremorData.forEach(element => {
      const meanX = this.getDataMeanX(element);
      const meanY =  this.getDataMeanY(element);
      const meanZ =  this.getDataMeanZ(element);
      const aggregatedXYZ =  this.getDataAggregatedXYZ(element);

      const layoutMeanXMean =  this.createLayout("Angular velocity on the x-axis (averages over days)", "Angular velocity [*/s]", [-0.4, 0.4]);
      const layoutMeanYMean =  this.createLayout("Angular velocity on the y-axis (averages over days)", "Angular velocity [*/s]", [-1, 0.5]);
      const layoutMeanZMean =  this.createLayout("Angular velocity on the z-axis (averages over days)", "Angular velocity [*/s]", [-0.4, 0.2]);
      const layoutAggregatedXYZ =  this.createLayout("Length of angular velocity vector (average of days)", "Angular velocity [*/s]", [0, 4]);

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
      this.createGraph(element.data.meanByDayX.dataBeforeMedLeft,"Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.meanByDayX.dataBeforeMedRight,"Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.meanByDayX.dataAfterMedLeft, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.meanByDayX.dataAfterMedRight,"After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataMeanY(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.meanByDayY.dataBeforeMedLeft, "Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.meanByDayY.dataBeforeMedRight,  "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.meanByDayY.dataAfterMedLeft,  "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.meanByDayY.dataAfterMedRight, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataMeanZ(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.meanByDayZ.dataBeforeMedLeft,"Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.meanByDayZ.dataBeforeMedRight, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.meanByDayZ.dataAfterMedLeft, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.meanByDayZ.dataAfterMedRight, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataAggregatedXYZ(element: TremorAnalysis) {
    return [
      this.createGraph(element.data.aggregatedMeanByDay.dataBeforeMedLeft,"Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.aggregatedMeanByDay.dataBeforeMedRight, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.aggregatedMeanByDay.dataAfterMedLeft, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.aggregatedMeanByDay.dataAfterMedRight, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
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

  private createLayout(title: string, titleX: string, range: number[]) {
    return {
      title: title,
      xaxis: {
        title: titleX,
        range: range
      },
      yaxis: {
        title: "Probability density function",
        showticklabels: false
      },
    }
  }
}
