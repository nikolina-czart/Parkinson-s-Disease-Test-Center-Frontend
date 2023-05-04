import {Component, Input, OnInit} from '@angular/core';
import {FingerTappingAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {
  FingerTappingGraphData
} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-graph-data";
import {
  FingerTappingAnalysisParameterDetails
} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis-parameter-details";

@Component({
  selector: 'app-mean-plot',
  templateUrl: './mean-plot.component.html',
  styleUrls: ['./mean-plot.component.css']
})
export class MeanPlotComponent implements OnInit {
  @Input() data!: FingerTappingAnalysis[];
  graphs: FingerTappingGraphData[] = [];

  ngOnInit(): void {
    this.data.forEach(element => {
      const y = this.createNumberArray(element.data.touchTime.dataBeforeMedLeftMeanByDays.length);

      const touchTimeIsAfterMedData = element.data.touchTime.dataAfterMedRight.length;
      const upTimeIsAfterMedData = element.data.upTime.dataAfterMedRight.length;
      const intertapIntervalIsAfterMedData = element.data.intertapInterval.dataAfterMedRight.length;

      const dataHoldTimeMean = touchTimeIsAfterMedData === 0 ? this.getHoldTimeBeforeMedDataMean(element, y) : this.getHoldTimeAllDataMean(element, y);
      const dataUpTimeMean = upTimeIsAfterMedData === 0 ? this.getUpTimeBeforeMedDataMean(element, y) : this.getUpTimeAllDataMean(element, y);
      const dataIntertapIntervalMean = intertapIntervalIsAfterMedData === 0 ? this.getIntertapIntervalBeforeMedDataMean(element, y) : this.getIntertapIntervalAllDataMean(element, y);

      const layoutHoldTimeMean =  this.createLayout("Hold Time (średnie z dni)", "Średnia arytmetyczna HT [ms]", this.getMaxRangeY(element.data.touchTime));
      const layoutUpTimeMean =  this.createLayout("Up Time (średnie z dni)", "Średnia arytmetyczna UT [ms]",  this.getMaxRangeY(element.data.upTime));
      const layoutIntertapIntervalMean =  this.createLayout("Intertap Interval (średnie z dni)", "Średnia arytmetyczna IIT[ms]",  this.getMaxRangeY(element.data.intertapInterval));

      this.graphs.push({
        period: element.period,
        dataTouchTime: {
          data: [],
          layout: {}
        },
        dataUpTime: {
          data: [],
          layout: {}
        },
        dataIntertapInterval: {
          data: [],
          layout: {}
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

  private getHoldTimeBeforeMedDataMean(element: FingerTappingAnalysis, y: number[]) {
    return [
      this.createGraph(element.data.touchTime.dataBeforeMedLeftMeanByDays, y, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", "x1", "y1"),
      this.createGraph(element.data.touchTime.dataBeforeMedRightMeanByDays, y, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", "x2", "y2"),
    ]
  }

  private getHoldTimeAllDataMean(element: FingerTappingAnalysis, y: number[]) {
    return [
      this.createGraph(element.data.touchTime.dataBeforeMedLeftMeanByDays, y, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", "x1", "y1"),
      this.createGraph(element.data.touchTime.dataBeforeMedRightMeanByDays, y, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", "x2", "y2"),
      this.createGraph(element.data.touchTime.dataAfterMedLeftMeanByDays, y, "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", "x3", "y3"),
      this.createGraph(element.data.touchTime.dataAfterMedRightMeanByDays, y, "Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", "x4", "y4"),
    ]
  }

  private getUpTimeBeforeMedDataMean(element: FingerTappingAnalysis, y: number[]) {
    return [
      this.createGraph(element.data.upTime.dataBeforeMedLeftMeanByDays, y, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", "x1", "y1"),
      this.createGraph(element.data.upTime.dataBeforeMedRightMeanByDays, y, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", "x2", "y2"),
    ]
  }

  private getUpTimeAllDataMean(element: FingerTappingAnalysis, y: number[]) {
    return [
      this.createGraph(element.data.upTime.dataBeforeMedLeftMeanByDays, y, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", "x1", "y1"),
      this.createGraph(element.data.upTime.dataBeforeMedRightMeanByDays, y, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", "x2", "y2"),
      this.createGraph(element.data.upTime.dataAfterMedLeftMeanByDays, y, "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", "x3", "y3"),
      this.createGraph(element.data.upTime.dataAfterMedRightMeanByDays, y, "Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", "x4", "y4"),
    ]
  }

  private getIntertapIntervalBeforeMedDataMean(element: FingerTappingAnalysis, y: number[]) {
    return [
      this.createGraph(element.data.intertapInterval.dataBeforeMedLeftMeanByDays, y, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", "x1", "y1"),
      this.createGraph(element.data.intertapInterval.dataBeforeMedRightMeanByDays, y, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", "x2", "y2"),
    ]
  }

  private getIntertapIntervalAllDataMean(element: FingerTappingAnalysis, y: number[]) {
    return [
      this.createGraph(element.data.intertapInterval.dataBeforeMedLeftMeanByDays, y, "Przed lekami - lewa strona", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", "x1", "y1"),
      this.createGraph(element.data.intertapInterval.dataBeforeMedRightMeanByDays, y, "Przed lekami - prawa strona", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", "x2", "y2"),
      this.createGraph(element.data.intertapInterval.dataAfterMedLeftMeanByDays, y, "Po lekach - lewa strona", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", "x3", "y3"),
      this.createGraph(element.data.intertapInterval.dataAfterMedRightMeanByDays, y, "Po lekach - prawa strona", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", "x4", "y4"),
    ]
  }

  private createGraph(data: number[], y: number[], name:string, colorLine:string, colorPoint: string, xaxis: string, yaxis: string) {
    return {
      x: y,
      y: data,
      mode: 'lines+markers',
      title: name,
      marker: {
        color: colorPoint,
        size: 3
      },
      line: {
        color: colorLine,
        width: 1
      },
      xaxis: xaxis,
      yaxis: yaxis,
    }
  }
  private createNumberArray(length:number):number[] {
    const numberArray = [];
    for (let i = 0; i < length; i++) {
      numberArray.push(i);
    }
    return numberArray;
  }

  private createLayout(title: string, titleY: string, maxRangeX: number) {
    return {
      title: title,
      grid: {rows: 2, columns: 2, pattern: 'independent'},
      yaxis: {
        title: titleY,
        range: [0, maxRangeX]
      },
      xaxis: {
        title: "Numer badania [-]",
      },
      xaxis1: {
        title: "Numer badania [-]",
      },
      xaxis2: {
        title: "Numer badania [-]",
      },
      xaxis3: {
        title: "Numer badania [-]",
      },
      xaxis4: {
        title: "Numer badania [-]",
      },
    }
  }

  private getMaxRangeY(data: FingerTappingAnalysisParameterDetails) {
    const max = [
      Math.max(...data.dataBeforeMedLeftMeanByDays),
      Math.max(...data.dataBeforeMedRightMeanByDays),
      Math.max(...data.dataAfterMedRightMeanByDays),
      Math.max(...data.dataAfterMedLeftMeanByDays)
    ]
    return Math.max(...max) + 10;
  }
}
