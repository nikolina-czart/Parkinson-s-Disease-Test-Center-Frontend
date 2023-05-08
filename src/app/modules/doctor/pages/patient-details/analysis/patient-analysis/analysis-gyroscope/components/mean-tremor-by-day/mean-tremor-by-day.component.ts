import {Component, Input, OnInit} from '@angular/core';
import {TremorAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/TremorAnalysis";
import {TremorGraphData} from "../../../../../../../../../models/analysis/finger-tapping/tremor-graph-data";

@Component({
  selector: 'app-mean-tremor-by-day',
  templateUrl: './mean-tremor-by-day.component.html',
  styleUrls: ['./mean-tremor-by-day.component.scss']
})
export class MeanTremorByDayComponent implements OnInit {
  @Input() tremorData!: TremorAnalysis[];
  graphs: TremorGraphData[] = [];
  ngOnInit(): void {
    this.tremorData.forEach(element => {
      const meanXAxisX = this.createNumberArray(element.data.meanByDayX.dataBeforeMedLeft.length);
      const meanXAxisY = this.createNumberArray(element.data.meanByDayY.dataBeforeMedLeft.length);
      const meanXAxisZ = this.createNumberArray(element.data.meanByDayZ.dataBeforeMedLeft.length);
      const aggregatedXYZAxisX = this.createNumberArray(element.data.aggregatedMeanByDay.dataBeforeMedLeft.length);

      const meanX = this.getDataMeanX(element, meanXAxisX);
      const meanY =  this.getDataMeanY(element, meanXAxisY);
      const meanZ =  this.getDataMeanZ(element, meanXAxisZ);
      const aggregatedXYZ =  this.getDataAggregatedXYZ(element, aggregatedXYZAxisX);

      const layoutMeanXMean =  this.createLayout("Angular velocity on the x-axis (averages over days) ", "Angular velocity [*/s]");
      const layoutMeanYMean =  this.createLayout("Angular velocity on the y-axis (averages over days) ", "Angular velocity [*/s]");
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

  private getDataMeanX(element: TremorAnalysis, meanXAxisX: number[]) {
    return [
      this.createGraph(element.data.meanByDayX.dataBeforeMedLeft, meanXAxisX, "Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.meanByDayX.dataBeforeMedRight, meanXAxisX, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.meanByDayX.dataAfterMedLeft, meanXAxisX, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.meanByDayX.dataAfterMedRight, meanXAxisX, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataMeanY(element: TremorAnalysis, meanXAxisY: number[]) {
    return [
      this.createGraph(element.data.meanByDayY.dataBeforeMedLeft, meanXAxisY, "Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.meanByDayY.dataBeforeMedRight, meanXAxisY, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.meanByDayY.dataAfterMedLeft, meanXAxisY, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.meanByDayY.dataAfterMedRight, meanXAxisY, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataMeanZ(element: TremorAnalysis, meanXAxisZ: number[]) {
    return [
      this.createGraph(element.data.meanByDayZ.dataBeforeMedLeft, meanXAxisZ, "Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.meanByDayZ.dataBeforeMedRight, meanXAxisZ, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.meanByDayZ.dataAfterMedLeft, meanXAxisZ, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.meanByDayZ.dataAfterMedRight, meanXAxisZ, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
    ]
  }

  private getDataAggregatedXYZ(element: TremorAnalysis, meanXAxisZ: number[]) {
    return [
      this.createGraph(element.data.aggregatedMeanByDay.dataBeforeMedLeft, meanXAxisZ, "Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)"),
      this.createGraph(element.data.aggregatedMeanByDay.dataBeforeMedRight, meanXAxisZ, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)"),
      this.createGraph(element.data.aggregatedMeanByDay.dataAfterMedLeft, meanXAxisZ, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)"),
      this.createGraph(element.data.aggregatedMeanByDay.dataAfterMedRight, meanXAxisZ, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)"),
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
        title: "Test number [-]",
      },
    }
  }
}
