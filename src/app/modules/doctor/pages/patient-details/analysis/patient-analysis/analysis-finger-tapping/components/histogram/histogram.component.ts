import {Component, Input, OnInit} from '@angular/core';
import {
  FingerTappingAnalysisHistogram
} from "../../../../../../../../../models/analysis/finger-tapping/histogram/finger-tapping-analysis-histogram";
import {
  HistogramFingerTapping
} from "../../../../../../../../../models/analysis/finger-tapping/histogram/histogram-finger-tapping";
import {
  FingerTappingAnalysisParameterDetails
} from "../../../../../../../../../models/analysis/finger-tapping/histogram/finger-tapping-analysis-parameter-details";

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {
  @Input() histogramData!: FingerTappingAnalysisHistogram[];
  graphs: HistogramFingerTapping[] = [];

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
          layout: this.getLayout('Hold Time')
        },
        dataUpTime: {
          data: [
            this.graphBeforeMefLeft(histogram.data.upTime.dataBeforeMedLeft),
            this.graphBeforeMedRight(histogram.data.upTime.dataBeforeMedRight),
            this.graphAfterMedLeft(histogram.data.upTime.dataAfterMedLeft),
            this.graphAfterMedRight(histogram.data.upTime.dataAfterMedRight)
          ],
          layout: this.getLayout('Up Time')
        },
        dataIntertapInterval: {
          data: [
            this.graphBeforeMefLeft(histogram.data.intertapInterval.dataBeforeMedLeft),
            this.graphBeforeMedRight(histogram.data.intertapInterval.dataBeforeMedRight),
            this.graphAfterMedLeft(histogram.data.intertapInterval.dataAfterMedLeft),
            this.graphAfterMedRight(histogram.data.intertapInterval.dataAfterMedRight)
          ],
          layout: this.getLayout('Intertap Invertal')
        },
        dataTouchTimeMean: {
          data: [
            this.graphBeforeMefLeft(histogram.data.touchTime.dataBeforeMedLeftMeanByDays),
            this.graphBeforeMedRight(histogram.data.touchTime.dataBeforeMedRightMeanByDays),
            this.graphAfterMedLeft(histogram.data.touchTime.dataAfterMedLeftMeanByDays),
            this.graphAfterMedRight(histogram.data.touchTime.dataAfterMedRightMeanByDays)
          ],
          layout: this.getLayout('Hold Time - średnia z pomiaru')
        },
        dataUpTimeMean: {
          data: [
            this.graphBeforeMefLeft(histogram.data.upTime.dataBeforeMedLeftMeanByDays),
            this.graphBeforeMedRight(histogram.data.upTime.dataBeforeMedRightMeanByDays),
            this.graphAfterMedLeft(histogram.data.upTime.dataAfterMedLeftMeanByDays),
            this.graphAfterMedRight(histogram.data.upTime.dataAfterMedRightMeanByDays)
          ],
          layout: this.getLayout('Up Time - średnia z pomiaru')
        },
        dataIntertapIntervalMean: {
          data: [
            this.graphBeforeMefLeft(histogram.data.intertapInterval.dataBeforeMedLeftMeanByDays),
            this.graphBeforeMedRight(histogram.data.intertapInterval.dataBeforeMedRightMeanByDays),
            this.graphAfterMedLeft(histogram.data.intertapInterval.dataAfterMedLeftMeanByDays),
            this.graphAfterMedRight(histogram.data.intertapInterval.dataAfterMedRightMeanByDays)
          ],
          layout: this.getLayout('Intertap Invertal - średnia z pomiaru')
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
  private getLayout(title: string) {
    return {
      bargap: 0.05,
      bargroupgap: 0.2,
      barmode: "overlay",
      title: title,
      xaxis: {title: "Value"},
      yaxis: {title: "Count"}
    }
  }

}
