import {Component, Input, OnInit} from '@angular/core';
import {FingerTappingAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {
  FingerTappingGraphData
} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-graph-data";
import {Plotly} from "angular-plotly.js/lib/plotly.interface";

@Component({
  selector: 'app-violin',
  templateUrl: './violin.component.html',
  styleUrls: ['./violin.component.scss']
})
export class ViolinComponent implements OnInit {
  @Input() data!: FingerTappingAnalysis[];
  graphs: FingerTappingGraphData[] = [];

  ngOnInit(): void {
    this.data.forEach(element => {
      const touchTimeIsAfterMedData = element.data.touchTime.dataAfterMedRight.length;
      const upTimeIsAfterMedData = element.data.upTime.dataAfterMedRight.length;
      const intertapIntervalIsAfterMedData = element.data.intertapInterval.dataAfterMedRight.length;

      const dataHoldTime = touchTimeIsAfterMedData === 0 ? this.getHoldTimeBeforeMedData(element) : this.getHoldTimeAllData(element);
      const dataHoldTimeMean = touchTimeIsAfterMedData === 0 ? this.getHoldTimeBeforeMedDataMean(element) : this.getHoldTimeAllDataMean(element);

      const dataUpTime = upTimeIsAfterMedData === 0 ? this.getUpTimeBeforeMedData(element) : this.getUpTimeAllData(element);
      const dataUpTimeMean = upTimeIsAfterMedData === 0 ? this.getUpTimeBeforeMedDataMean(element) : this.getUpTimeAllDataMean(element);

      const dataIntertapInterval = intertapIntervalIsAfterMedData === 0 ? this.getIntertapIntervalBeforeMedData(element) : this.getIntertapIntervalAllData(element);
      const dataIntertapIntervalMean = intertapIntervalIsAfterMedData === 0 ? this.getIntertapIntervalBeforeMedDataMean(element) : this.getIntertapIntervalAllDataMean(element);

      const layoutHoldTime =  this.createLayout("Hold Time ", -100, 700, "Hold time [ms]");
      const layoutHoldTimeMean =  this.createLayout("Hold Time (averages over days)", 100, 600, "Hold time [ms]");
      const layoutUpTime =  this.createLayout("Up Time", -200, 600, "Up time [ms]");
      const layoutUpTimeMean =  this.createLayout("Up Time (averages over days)", 100, 300, "Up time [ms]");
      const layoutIntertapInterval =  this.createLayout("Intertap Interval", 0, 1000, "Intertap invertal time [ms]");
      const layoutIntertapIntervalMean =  this.createLayout("Intertap Interval (averages over days)", 200, 800, "Intertap invertal time [ms]");

      this.graphs.push({
        period: element.period,
        dataTouchTime: {
          data: dataHoldTime,
          layout: layoutHoldTime
        },
        dataUpTime: {
          data: dataUpTime,
          layout: layoutUpTime
        },
        dataIntertapInterval: {
          data: dataIntertapInterval,
          layout: layoutIntertapInterval
        },
        dataTouchTimeMean: {
          data: dataHoldTimeMean,
          layout: layoutHoldTimeMean
        },
        dataUpTimeMean: {
          data: dataUpTimeMean,
          layout: layoutUpTimeMean
        },
        dataIntertapIntervalMean: {
          data: dataIntertapIntervalMean,
          layout: layoutIntertapIntervalMean
        }
      })
    })
  }

  private createGraphViolin(xTitle: string, data: number[], legendGroup: string, scaleGroup: string, name: string, side: string, color: string, showLegend:boolean) {
    return {
      type: 'violin',
      x0: xTitle,
      y: data,
      legendgroup: legendGroup,
      scalegroup: scaleGroup,
      name: name,
      side: side,
      box: {
        visible: true
      },
      line: {
        color: color,
        width: 2
      },
      meanline: {
        visible: true
      },
      showlegend: showLegend
    }
  }

  private createLayout(title: string, minRangeY: number, maxRangeY: number, titleAxisY: string) {
    return {
      title: title,
      yaxis: {
        title: titleAxisY,
        range: [minRangeY, maxRangeY]
      },
    }
  }

  private getHoldTimeBeforeMedData(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Before medicines (left/right)", element.data.touchTime.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Before medicines (left/right)", element.data.touchTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Before medication - right hand", 'positive', "rgba(0, 204, 102, 0.7)", false),
    ]
  }

  private getHoldTimeAllData(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Before medicines (left/right)", element.data.touchTime.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Before medicines (left/right)", element.data.touchTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Before medication - right hand", 'positive', "rgba(0, 204, 102, 0.7)", false),
      this.createGraphViolin("After medication (left/right)", element.data.touchTime.dataAfterMedLeft, "legend-group-3", "scale-group-2", "After medication - left hand", 'negative', "rgba(0, 102, 204, 0.7)", true),
      this.createGraphViolin("After medication (left/right)", element.data.touchTime.dataAfterMedRight, "legend-group-4", "scale-group-2", "After medication - right hand", 'positive', "rgba(204, 0, 102, 0.7)", false),
      this.createGraphViolin("Right hand (before/after)", element.data.touchTime.dataBeforeMedRight, "legend-group-2", "scale-group-3", "Before medication - right hand", 'negative', "rgba(0, 204, 102, 0.7)", true),
      this.createGraphViolin("Right hand (before/after)", element.data.touchTime.dataAfterMedRight, "legend-group-4", "scale-group-3", "After medication - right hand", 'positive', "rgba(204, 0, 102, 0.7)", false),
      this.createGraphViolin("Left hand (before/after)", element.data.touchTime.dataBeforeMedLeft, "legend-group-1", "scale-group-4", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Left hand (before/after)", element.data.touchTime.dataAfterMedLeft, "legend-group-3", "scale-group-4", "After medication - left hand", 'positive', "rgba(0, 102, 204, 0.7)", false)
    ];
  }

  private getHoldTimeBeforeMedDataMean(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Before medicines", element.data.touchTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Before medicines", element.data.touchTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Before medication - right hand", 'positive', "rgba(0, 204, 102, 0.7)", false),
    ]
  }

  private getHoldTimeAllDataMean(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Before medicines (left/right)", element.data.touchTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Before medicines (left/right)", element.data.touchTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Before medication - right hand", 'positive', "rgba(0, 204, 102, 0.7)", false),
      this.createGraphViolin("After medication (left/right)", element.data.touchTime.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-2", "After medication - left hand", 'negative', "rgba(0, 102, 204, 0.7)", true),
      this.createGraphViolin("After medication (left/right)", element.data.touchTime.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-2", "After medication - right hand", 'positive', "rgba(204, 0, 102, 0.7)", false),
      this.createGraphViolin("Right hand (before/after)", element.data.touchTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-3", "Before medication - right hand", 'negative', "rgba(0, 204, 102, 0.7)", true),
      this.createGraphViolin("Right hand (before/after)", element.data.touchTime.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-3", "After medication - right hand", 'positive', "rgba(204, 0, 102, 0.7)", false),
      this.createGraphViolin("Left hand (before/after)", element.data.touchTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-4", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Left hand (before/after)", element.data.touchTime.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-4", "After medication - left hand", 'positive', "rgba(0, 102, 204, 0.7)", false)
    ]
  }

  private getUpTimeBeforeMedData(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Before medicines (left/right)", element.data.upTime.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Before medicines (left/right)", element.data.upTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Before medication - right hand", 'positive', "rgba(0, 204, 102, 0.7)", false),
    ]
  }

  private getUpTimeAllData(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Before medicines (left/right)", element.data.upTime.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Before medicines (left/right)", element.data.upTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Before medication - right hand", 'positive', "rgba(0, 204, 102, 0.7)", false),
      this.createGraphViolin("After medication (left/right)", element.data.upTime.dataAfterMedLeft, "legend-group-3", "scale-group-2", "After medication - left hand", 'negative', "rgba(0, 102, 204, 0.7)", true),
      this.createGraphViolin("After medication (left/right)", element.data.upTime.dataAfterMedRight, "legend-group-4", "scale-group-2", "After medication - right hand", 'positive', "rgba(204, 0, 102, 0.7)", false),
      this.createGraphViolin("Right hand (before/after)", element.data.upTime.dataBeforeMedRight, "legend-group-2", "scale-group-3", "Before medication - right hand", 'negative', "rgba(0, 204, 102, 0.7)", true),
      this.createGraphViolin("Right hand (before/after)", element.data.upTime.dataAfterMedRight, "legend-group-4", "scale-group-3", "After medication - right hand", 'positive', "rgba(204, 0, 102, 0.7)", false),
      this.createGraphViolin("Left hand (before/after)", element.data.upTime.dataBeforeMedLeft, "legend-group-1", "scale-group-4", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Left hand (before/after)", element.data.upTime.dataAfterMedLeft, "legend-group-3", "scale-group-4", "After medication - left hand", 'positive', "rgba(0, 102, 204, 0.7)", false)
    ]
  }

  private getUpTimeBeforeMedDataMean(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Before medicines (left/right)", element.data.upTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Before medicines (left/right)", element.data.upTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Before medication - right hand", 'positive', "rgba(0, 204, 102, 0.7)", false),
    ];
  }

  private getUpTimeAllDataMean(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Before medicines (left/right)", element.data.upTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Before medicines (left/right)", element.data.upTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Before medication - right hand", 'positive', "rgba(0, 204, 102, 0.7)", false),
      this.createGraphViolin("After medication (left/right)", element.data.upTime.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-2", "After medication - left hand", 'negative', "rgba(0, 102, 204, 0.7)", true),
      this.createGraphViolin("After medication (left/right)", element.data.upTime.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-2", "After medication - right hand", 'positive', "rgba(204, 0, 102, 0.7)", false),
      this.createGraphViolin("Right hand (before/after)", element.data.upTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-3", "Before medication - right hand", 'negative', "rgba(0, 204, 102, 0.7)", true),
      this.createGraphViolin("Right hand (before/after)", element.data.upTime.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-3", "After medication - right hand", 'positive', "rgba(204, 0, 102, 0.7)", false),
      this.createGraphViolin("Left hand (before/after)", element.data.upTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-4", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Left hand (before/after)", element.data.upTime.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-4", "After medication - left hand", 'positive', "rgba(0, 102, 204, 0.7)", false)
    ];
  }

  private getIntertapIntervalBeforeMedData(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Before medicines (left/right)", element.data.intertapInterval.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Before medicines (left/right)", element.data.intertapInterval.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Before medication - right hand", 'positive', "rgba(0, 204, 102, 0.7)", false),
    ]
  }

  private getIntertapIntervalAllData(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Before medicines (left/right)", element.data.intertapInterval.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Before medicines (left/right)", element.data.intertapInterval.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Before medication - right hand", 'positive', "rgba(0, 204, 102, 0.7)", false),
      this.createGraphViolin("After medication (left/right)", element.data.intertapInterval.dataAfterMedLeft, "legend-group-3", "scale-group-2", "After medication - left hand", 'negative', "rgba(0, 102, 204, 0.7)", true),
      this.createGraphViolin("After medication (left/right)", element.data.intertapInterval.dataAfterMedRight, "legend-group-4", "scale-group-2", "After medication - right hand", 'positive', "rgba(204, 0, 102, 0.7)", false),
      this.createGraphViolin("Right hand (before/after)", element.data.intertapInterval.dataBeforeMedRight, "legend-group-2", "scale-group-3", "Before medication - right hand", 'negative', "rgba(0, 204, 102, 0.7)", true),
      this.createGraphViolin("Right hand (before/after)", element.data.intertapInterval.dataAfterMedRight, "legend-group-4", "scale-group-3", "After medication - right hand", 'positive', "rgba(204, 0, 102, 0.7)", false),
      this.createGraphViolin("Left hand (before/after)", element.data.intertapInterval.dataBeforeMedLeft, "legend-group-1", "scale-group-4", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Left hand (before/after)", element.data.intertapInterval.dataAfterMedLeft, "legend-group-3", "scale-group-4", "After medication - left hand", 'positive', "rgba(0, 102, 204, 0.7)", false)
    ]
  }

  private getIntertapIntervalBeforeMedDataMean(element: FingerTappingAnalysis) {
    return  [
      this.createGraphViolin("Before medicines (left/right)", element.data.intertapInterval.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Before medicines (left/right)", element.data.intertapInterval.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Before medication - right hand", 'positive', "rgba(0, 204, 102, 0.7)", false),
    ]
  }

  private getIntertapIntervalAllDataMean(element: FingerTappingAnalysis) {
    return  [
      this.createGraphViolin("Before medicines (left/right)", element.data.intertapInterval.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Before medicines (left/right)", element.data.intertapInterval.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Before medication - right hand", 'positive', "rgba(0, 204, 102, 0.7)", false),
      this.createGraphViolin("After medication (left/right)", element.data.intertapInterval.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-2", "After medication - left hand", 'negative', "rgba(0, 102, 204, 0.7)", true),
      this.createGraphViolin("After medication (left/right)", element.data.intertapInterval.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-2", "After medication - right hand", 'positive', "rgba(204, 0, 102, 0.7)", false),
      this.createGraphViolin("Right hand (before/after)", element.data.intertapInterval.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-3", "Before medication - right hand", 'negative', "rgba(0, 204, 102, 0.7)", true),
      this.createGraphViolin("Right hand (before/after)", element.data.intertapInterval.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-3", "After medication - right hand", 'positive', "rgba(204, 0, 102, 0.7)", false),
      this.createGraphViolin("Left hand (before/after)", element.data.intertapInterval.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-4", "Before medication - left hand", 'negative', "rgba(204, 102, 0, 0.7)", true),
      this.createGraphViolin("Left hand (before/after)", element.data.intertapInterval.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-4", "After medication - left hand", 'positive', "rgba(0, 102, 204, 0.7)", false)
    ]
  }
}
