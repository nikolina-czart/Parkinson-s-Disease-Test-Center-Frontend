import {Component, Input, OnInit} from '@angular/core';
import {FingerTappingAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {FingerTappingGraphData} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-graph-data";
import {Plotly} from "angular-plotly.js/lib/plotly.interface";

@Component({
  selector: 'app-box-plot',
  templateUrl: './box-plot.component.html',
  styleUrls: ['./box-plot.component.scss']
})
export class BoxPlotComponent implements OnInit{
  @Input() data!: FingerTappingAnalysis[];
  graphs: FingerTappingGraphData[] = [];

  ngOnInit(): void {
    this.data.forEach(element => {
      const dataTouchTime = [
        this.graphBeforeMefLeft(element.data.touchTime.dataBeforeMedLeft),
        this.graphBeforeMedRight(element.data.touchTime.dataBeforeMedRight),
        this.graphAfterMedLeft(element.data.touchTime.dataAfterMedLeft),
        this.graphAfterMedRight(element.data.touchTime.dataAfterMedRight)
      ];
      const dataUpTime = [
        this.graphBeforeMefLeft(element.data.upTime.dataBeforeMedLeft),
        this.graphBeforeMedRight(element.data.upTime.dataBeforeMedRight),
        this.graphAfterMedLeft(element.data.upTime.dataAfterMedLeft),
        this.graphAfterMedRight(element.data.upTime.dataAfterMedRight)
      ];
      const dataIntertapInterval = [
        this.graphBeforeMefLeft(element.data.intertapInterval.dataBeforeMedLeft),
        this.graphBeforeMedRight(element.data.intertapInterval.dataBeforeMedRight),
        this.graphAfterMedLeft(element.data.intertapInterval.dataAfterMedLeft),
        this.graphAfterMedRight(element.data.intertapInterval.dataAfterMedRight)
      ]
      const dataTouchTimeMean = [
        this.graphBeforeMefLeft(element.data.touchTime.dataBeforeMedLeftMeanByDays),
        this.graphBeforeMedRight(element.data.touchTime.dataBeforeMedRightMeanByDays),
        this.graphAfterMedLeft(element.data.touchTime.dataAfterMedLeftMeanByDays),
        this.graphAfterMedRight(element.data.touchTime.dataAfterMedRightMeanByDays)
      ]
      const dataUpTimeMean = [
        this.graphBeforeMefLeft(element.data.upTime.dataBeforeMedLeftMeanByDays),
        this.graphBeforeMedRight(element.data.upTime.dataBeforeMedRightMeanByDays),
        this.graphAfterMedLeft(element.data.upTime.dataAfterMedLeftMeanByDays),
        this.graphAfterMedRight(element.data.upTime.dataAfterMedRightMeanByDays)
      ]
      const dataIntertapIntervalMean = [
          this.graphBeforeMefLeft(element.data.intertapInterval.dataBeforeMedLeftMeanByDays),
          this.graphBeforeMedRight(element.data.intertapInterval.dataBeforeMedRightMeanByDays),
          this.graphAfterMedLeft(element.data.intertapInterval.dataAfterMedLeftMeanByDays),
          this.graphAfterMedRight(element.data.intertapInterval.dataAfterMedRightMeanByDays)
        ]

      this.graphs.push({
        period: element.period,
        dataTouchTime: {
          data: dataTouchTime,
          layout: this.getLayout(250,'Hold Time', 'HT [ms]')
        },
        dataUpTime: {
          data: dataUpTime,
          layout: this.getLayout(250,'Up Time', 'UP [ms]')
        },
        dataIntertapInterval: {
          data: dataIntertapInterval,
          layout: this.getLayout(350, 'Intertap Invertal', 'ITI [ms]')
        },
        dataTouchTimeMean: {
          data: dataTouchTimeMean,
          layout: this.getLayout(250, 'Hold Time - średnia z pomiaru', 'HT [ms]')
        },
        dataUpTimeMean: {
          data: dataUpTimeMean,
          layout: this.getLayout(250, 'Up Time - średnia z pomiaru', 'UT [ms]')
        },
        dataIntertapIntervalMean: {
          data: dataIntertapIntervalMean,
          layout: this.getLayout(350,'Intertap Invertal - średnia z pomiaru', 'ITI [ms]')
        },
      })
    })
  }

  private graphBeforeMefLeft(data: number[]) {
    return {
      y: data,
      type: 'box',
      name: 'Przed lekami - lewa ręka',
      marker: {
        color: "rgba(204, 102, 0, 0.7)",
        line: {
          color:  "rgba(204, 102, 0, 1)",
          width: 1
        }
      },
      opacity: 0.5,
      boxpoints: 'Outliers'
    }
  }
  private graphBeforeMedRight(data: number[]) {
    return {
      y: data,
      type: 'box',
      name: 'Przed lekami - prawa ręka',
      marker: {
        color: "rgba(0, 204, 102, 0.7)",
        line: {
          color:  "rgba(0, 204, 102, 1)",
          width: 1
        }
      },
      opacity: 0.5,
      boxpoints: 'Outliers'
    }
  }
  private graphAfterMedLeft(data: number[]) {
    return {
      y: data,
      type: 'box',
      name: 'Po lekach - lewa ręka',
      marker: {
        color: "rgba(0, 102, 204, 0.7)",
        line: {
          color:  "rgba(0, 102, 204, 1)",
          width: 1
        }
      },
      opacity: 0.5,
      boxpoints: 'Outliers'
    }
  }
  private graphAfterMedRight(data: number[]) {
    return {
      y: data,
      type: 'box',
      name: 'Po lekach - prawa ręka',
      marker: {
        color: "rgba(204, 0, 102, 0.7)",
        line: {
          color:  "rgba(204, 0, 102, 1)",
          width: 1
        }
      },
      opacity: 0.5,
      boxpoints: 'Outliers'
    }
  }

  private getLayout(maxRange:number, title: string, yaxis: string) {
    return {
      title: title,
      yaxis: {
        title: yaxis,
      },
      xaxis: {
        showticklabels: false
      },
    }
  }
}
