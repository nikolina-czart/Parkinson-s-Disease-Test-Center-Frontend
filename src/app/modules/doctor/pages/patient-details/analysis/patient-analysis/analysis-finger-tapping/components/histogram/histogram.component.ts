import {Component, Input, OnInit} from '@angular/core';
import {FingerTappingAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {
  FingerTappingGraphData
} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-graph-data";

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.scss']
})
export class HistogramComponent implements OnInit {
  @Input() histogramData!: FingerTappingAnalysis[];
  graphs: FingerTappingGraphData[] = [];

  ngOnInit(): void {
    this.histogramData.forEach(histogram => {
      this.graphs.push({
        period: histogram.period,
        dataTouchTime: {
          data: [
            this.graphBeforeMefLeft(histogram.data.touchTime.dataBeforeMedLeft),
            this.graphBeforeMedRight(histogram.data.touchTime.dataBeforeMedRight),
            this.graphAfterMedLeft(histogram.data.touchTime.dataAfterMedLeft),
            this.graphAfterMedRight(histogram.data.touchTime.dataAfterMedRight)
          ],
          layout: this.getLayout('Hold Time', "HT [ms]")
        },
        dataUpTime: {
          data: [
            this.graphBeforeMefLeft(histogram.data.upTime.dataBeforeMedLeft),
            this.graphBeforeMedRight(histogram.data.upTime.dataBeforeMedRight),
            this.graphAfterMedLeft(histogram.data.upTime.dataAfterMedLeft),
            this.graphAfterMedRight(histogram.data.upTime.dataAfterMedRight)
          ],
          layout: this.getLayout('Up Time', "UT [ms]")
        },
        dataIntertapInterval: {
          data: [
            this.graphBeforeMefLeft(histogram.data.intertapInterval.dataBeforeMedLeft),
            this.graphBeforeMedRight(histogram.data.intertapInterval.dataBeforeMedRight),
            this.graphAfterMedLeft(histogram.data.intertapInterval.dataAfterMedLeft),
            this.graphAfterMedRight(histogram.data.intertapInterval.dataAfterMedRight)
          ],
          layout: this.getLayout('Intertap Invertal', "IIT [ms]")
        },
        dataTouchTimeMean: {
          data: [
            this.graphBeforeMefLeft(histogram.data.touchTime.dataBeforeMedLeftMeanByDays),
            this.graphBeforeMedRight(histogram.data.touchTime.dataBeforeMedRightMeanByDays),
            this.graphAfterMedLeft(histogram.data.touchTime.dataAfterMedLeftMeanByDays),
            this.graphAfterMedRight(histogram.data.touchTime.dataAfterMedRightMeanByDays)
          ],
          layout: this.getLayout('Hold Time - średnia z pomiaru', "HT [ms]")
        },
        dataUpTimeMean: {
          data: [
            this.graphBeforeMefLeft(histogram.data.upTime.dataBeforeMedLeftMeanByDays),
            this.graphBeforeMedRight(histogram.data.upTime.dataBeforeMedRightMeanByDays),
            this.graphAfterMedLeft(histogram.data.upTime.dataAfterMedLeftMeanByDays),
            this.graphAfterMedRight(histogram.data.upTime.dataAfterMedRightMeanByDays)
          ],
          layout: this.getLayout('Up Time - średnia z pomiaru', "UT [ms]")
        },
        dataIntertapIntervalMean: {
          data: [
            this.graphBeforeMefLeft(histogram.data.intertapInterval.dataBeforeMedLeftMeanByDays),
            this.graphBeforeMedRight(histogram.data.intertapInterval.dataBeforeMedRightMeanByDays),
            this.graphAfterMedLeft(histogram.data.intertapInterval.dataAfterMedLeftMeanByDays),
            this.graphAfterMedRight(histogram.data.intertapInterval.dataAfterMedRightMeanByDays)
          ],
          layout: this.getLayout('Intertap Invertal - średnia z pomiaru', "IIT [ms]")
        },
      })
    })
  }

  private graphBeforeMefLeft(data: number[]) {
    return {
      x: data,
      type: 'histogram',
      name: 'Przed lekami - lewa ręka',
      marker: {
        color: "rgba(204, 102, 0, 0.7)",
        line: {
          color:  "rgba(204, 102, 0, 1)",
          width: 1
        }
      },
      opacity: 0.5,
      xbins: {
        end: 800,
        size: 20,
        start: 0
      }
    }
  }
  private graphBeforeMedRight(data: number[]) {
    return {
      x: data,
      type: 'histogram',
      name: 'Przed lekami - prawa ręka',
      marker: {
        color: "rgba(0, 204, 102, 0.7)",
        line: {
          color:  "rgba(0, 204, 102, 1)",
          width: 1
        }
      },
      opacity: 0.5,
      xbins: {
        end: 800,
        size: 20,
        start: 0

      }
    }
  }
  private graphAfterMedLeft(data: number[]) {
    return {
      x: data,
      type: 'histogram',
      name: 'Po lekach - lewa ręka',
      marker: {
        color: "rgba(0, 102, 204, 0.7)",
        line: {
          color:  "rgba(0, 102, 204, 1)",
          width: 1
        }
      },
      opacity: 0.5,
      xbins: {
        end: 800,
        size: 20,
        start: 0

      }
    }
  }
  private graphAfterMedRight(data: number[]) {
    return {
      x: data,
      type: 'histogram',
      name: 'Po lekach - prawa ręka',
      marker: {
        color: "rgba(204, 0, 102, 0.7)",
        line: {
          color:  "rgba(204, 0, 102, 1)",
          width: 1
        }
      },
      opacity: 0.5,
      xbins: {
        end: 800,
        size: 20,
        start: 0
      }
    }
  }
  private getLayout(title: string, titleX: string) {
    return {
      bargap: 0.05,
      bargroupgap: 0.2,
      barmode: "overlay",
      title: title,
      xaxis: {title: titleX},
      yaxis: {title: "Ilość wystąpień"}
    }
  }

}
