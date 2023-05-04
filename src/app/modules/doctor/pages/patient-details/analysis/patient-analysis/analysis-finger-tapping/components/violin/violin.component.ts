import {Component, Input, OnInit} from '@angular/core';
import {FingerTappingAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {
  FingerTappingGraphData
} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-graph-data";
import {Plotly} from "angular-plotly.js/lib/plotly.interface";

@Component({
  selector: 'app-violin',
  templateUrl: './violin.component.html',
  styleUrls: ['./violin.component.css']
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

      const layoutHoldTime =  this.createLayout("Hold Time ", 0, 400, "Hold time [ms]");
      const layoutHoldTimeMean =  this.createLayout("Hold Time (średnie z dni)", 0, 400, "Hold time [ms]");
      const layoutUpTime =  this.createLayout("Up Time", 0, 400, "Up time [ms]");
      const layoutUpTimeMean =  this.createLayout("Up Time (średnie z dni)", 0, 300, "Up time [ms]");
      const layoutIntertapInterval =  this.createLayout("Intertap Interval", 0, 600, "Intertap invertal time [ms]");
      const layoutIntertapIntervalMean =  this.createLayout("Intertap Interval (średnie z dni)", 0, 600, "Intertap invertal time [ms]");

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

  private createGraphViolin(xTitle: string, data: number[], legendGroup: string, scaleGroup: string, name: string, side: string, color: string) {
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
      }
    }
  }

  private createLayout(title: string, minRangeY: number, maxRangeY: number, titleAxisY: string) {
    return {
      title: title,
      yaxis: {
        zeroline: false,
        range: [minRangeY, maxRangeY],
        title: titleAxisY
      },
    }
  }

  private getHoldTimeBeforeMedData(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
    ]
  }

  private getHoldTimeAllData(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
      this.createGraphViolin("Po lekach", element.data.touchTime.dataAfterMedLeft, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
      this.createGraphViolin("Po lekach", element.data.touchTime.dataAfterMedRight, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      this.createGraphViolin("Prawa ręka", element.data.touchTime.dataBeforeMedRight, "legend-group-2", "scale-group-3", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
      this.createGraphViolin("Prawa ręka", element.data.touchTime.dataAfterMedRight, "legend-group-4", "scale-group-3", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      this.createGraphViolin("Lewa ręka", element.data.touchTime.dataBeforeMedLeft, "legend-group-1", "scale-group-4", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Lewa ręka", element.data.touchTime.dataAfterMedLeft, "legend-group-3", "scale-group-4", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
    ];
  }

  private getHoldTimeBeforeMedDataMean(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
    ]
  }

  private getHoldTimeAllDataMean(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
      this.createGraphViolin("Po lekach", element.data.touchTime.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
      this.createGraphViolin("Po lekach", element.data.touchTime.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      this.createGraphViolin("Prawa ręka", element.data.touchTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-3", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
      this.createGraphViolin("Prawa ręka", element.data.touchTime.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-3", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      this.createGraphViolin("Lewa ręka", element.data.touchTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-4", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Lewa ręka", element.data.touchTime.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-4", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
    ]
  }

  private getUpTimeBeforeMedData(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Przed lekami", element.data.upTime.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Przed lekami", element.data.upTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
    ]
  }

  private getUpTimeAllData(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Przed lekami", element.data.upTime.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Przed lekami", element.data.upTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
      this.createGraphViolin("Po lekach", element.data.upTime.dataAfterMedLeft, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
      this.createGraphViolin("Po lekach", element.data.upTime.dataAfterMedRight, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      this.createGraphViolin("Prawa ręka", element.data.upTime.dataBeforeMedRight, "legend-group-2", "scale-group-3", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
      this.createGraphViolin("Prawa ręka", element.data.upTime.dataAfterMedRight, "legend-group-4", "scale-group-3", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      this.createGraphViolin("Lewa ręka", element.data.upTime.dataBeforeMedLeft, "legend-group-1", "scale-group-4", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Lewa ręka", element.data.upTime.dataAfterMedLeft, "legend-group-3", "scale-group-4", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
    ]
  }

  private getUpTimeBeforeMedDataMean(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Przed lekami", element.data.upTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Przed lekami", element.data.upTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
    ];
  }

  private getUpTimeAllDataMean(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Przed lekami", element.data.upTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Przed lekami", element.data.upTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
      this.createGraphViolin("Po lekach", element.data.upTime.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
      this.createGraphViolin("Po lekach", element.data.upTime.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      this.createGraphViolin("Prawa ręka", element.data.upTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-3", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
      this.createGraphViolin("Prawa ręka", element.data.upTime.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-3", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      this.createGraphViolin("Lewa ręka", element.data.upTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-4", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Lewa ręka", element.data.upTime.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-4", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
    ];
  }

  private getIntertapIntervalBeforeMedData(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Przed lekami", element.data.intertapInterval.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Przed lekami", element.data.intertapInterval.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
    ]
  }

  private getIntertapIntervalAllData(element: FingerTappingAnalysis) {
    return [
      this.createGraphViolin("Przed lekami", element.data.intertapInterval.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Przed lekami", element.data.intertapInterval.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
      this.createGraphViolin("Po lekach", element.data.intertapInterval.dataAfterMedLeft, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
      this.createGraphViolin("Po lekach", element.data.intertapInterval.dataAfterMedRight, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      this.createGraphViolin("Prawa ręka", element.data.intertapInterval.dataBeforeMedRight, "legend-group-2", "scale-group-3", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
      this.createGraphViolin("Prawa ręka", element.data.intertapInterval.dataAfterMedRight, "legend-group-4", "scale-group-3", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      this.createGraphViolin("Lewa ręka", element.data.intertapInterval.dataBeforeMedLeft, "legend-group-1", "scale-group-4", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Lewa ręka", element.data.intertapInterval.dataAfterMedLeft, "legend-group-3", "scale-group-4", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
    ]
  }

  private getIntertapIntervalBeforeMedDataMean(element: FingerTappingAnalysis) {
    return  [
      this.createGraphViolin("Przed lekami", element.data.intertapInterval.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Przed lekami", element.data.intertapInterval.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
    ]
  }

  private getIntertapIntervalAllDataMean(element: FingerTappingAnalysis) {
    return  [
      this.createGraphViolin("Przed lekami", element.data.intertapInterval.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Przed lekami", element.data.intertapInterval.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
      this.createGraphViolin("Po lekach", element.data.intertapInterval.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
      this.createGraphViolin("Po lekach", element.data.intertapInterval.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      this.createGraphViolin("Prawa ręka", element.data.intertapInterval.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-3", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
      this.createGraphViolin("Prawa ręka", element.data.intertapInterval.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-3", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      this.createGraphViolin("Lewa ręka", element.data.intertapInterval.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-4", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
      this.createGraphViolin("Lewa ręka", element.data.intertapInterval.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-4", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
    ]
  }
}
