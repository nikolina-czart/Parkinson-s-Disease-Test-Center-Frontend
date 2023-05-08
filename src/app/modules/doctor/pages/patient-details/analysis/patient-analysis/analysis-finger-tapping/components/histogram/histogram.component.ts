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
            this.graphBeforeMefLeft(histogram.data.touchTime.dataBeforeMedLeft, 800),
            this.graphBeforeMedRight(histogram.data.touchTime.dataBeforeMedRight, 800),
            this.graphAfterMedLeft(histogram.data.touchTime.dataAfterMedLeft, 800),
            this.graphAfterMedRight(histogram.data.touchTime.dataAfterMedRight, 800)
          ],
          layout: this.getLayout('Hold Time', "HT [ms]")
        },
        dataUpTime: {
          data: [
            this.graphBeforeMefLeft(histogram.data.upTime.dataBeforeMedLeft, 600),
            this.graphBeforeMedRight(histogram.data.upTime.dataBeforeMedRight, 600),
            this.graphAfterMedLeft(histogram.data.upTime.dataAfterMedLeft, 600),
            this.graphAfterMedRight(histogram.data.upTime.dataAfterMedRight, 600)
          ],
          layout: this.getLayout('Up Time', "UT [ms]")
        },
        dataIntertapInterval: {
          data: [
            this.graphBeforeMefLeft(histogram.data.intertapInterval.dataBeforeMedLeft, 1000),
            this.graphBeforeMedRight(histogram.data.intertapInterval.dataBeforeMedRight, 1000),
            this.graphAfterMedLeft(histogram.data.intertapInterval.dataAfterMedLeft, 1000),
            this.graphAfterMedRight(histogram.data.intertapInterval.dataAfterMedRight, 1000)
          ],
          layout: this.getLayout('Intertap Invertal', "IIT [ms]")
        },
        dataTouchTimeMean: {
          data: [
            this.graphBeforeMefLeft(histogram.data.touchTime.dataBeforeMedLeftMeanByDays, 800),
            this.graphBeforeMedRight(histogram.data.touchTime.dataBeforeMedRightMeanByDays, 800),
            this.graphAfterMedLeft(histogram.data.touchTime.dataAfterMedLeftMeanByDays, 800),
            this.graphAfterMedRight(histogram.data.touchTime.dataAfterMedRightMeanByDays, 800)
          ],
          layout: this.getLayout('Hold Time (averages on day)', "HT [ms]")
        },
        dataUpTimeMean: {
          data: [
            this.graphBeforeMefLeft(histogram.data.upTime.dataBeforeMedLeftMeanByDays, 600),
            this.graphBeforeMedRight(histogram.data.upTime.dataBeforeMedRightMeanByDays, 600),
            this.graphAfterMedLeft(histogram.data.upTime.dataAfterMedLeftMeanByDays, 600),
            this.graphAfterMedRight(histogram.data.upTime.dataAfterMedRightMeanByDays, 600)
          ],
          layout: this.getLayout('Up Time (averages on day)', "UT [ms]")
        },
        dataIntertapIntervalMean: {
          data: [
            this.graphBeforeMefLeft(histogram.data.intertapInterval.dataBeforeMedLeftMeanByDays, 1000),
            this.graphBeforeMedRight(histogram.data.intertapInterval.dataBeforeMedRightMeanByDays, 1000),
            this.graphAfterMedLeft(histogram.data.intertapInterval.dataAfterMedLeftMeanByDays, 1000),
            this.graphAfterMedRight(histogram.data.intertapInterval.dataAfterMedRightMeanByDays, 1000)
          ],
          layout: this.getLayout('Intertap Invertal (averages on day)', "IIT [ms]")
        },
      })
    })
  }

  private graphBeforeMefLeft(data: number[], end: number) {
    return {
      x: data,
      type: 'histogram',
      name: 'Before medication - left hand',
      marker: {
        color: "rgba(204, 102, 0, 0.7)",
        line: {
          color:  "rgba(204, 102, 0, 1)",
          width: 1
        }
      },
      opacity: 0.5,
      xbins: {
        end: end,
        size: 20,
        start: 0
      }
    }
  }
  private graphBeforeMedRight(data: number[], end: number) {
    return {
      x: data,
      type: 'histogram',
      name: 'Before medication - right hand',
      marker: {
        color: "rgba(0, 204, 102, 0.7)",
        line: {
          color:  "rgba(0, 204, 102, 1)",
          width: 1
        }
      },
      opacity: 0.5,
      xbins: {
        end: end,
        size: 20,
        start: 0

      }
    }
  }
  private graphAfterMedLeft(data: number[], end: number) {
    return {
      x: data,
      type: 'histogram',
      name: 'After medication - left hand',
      marker: {
        color: "rgba(0, 102, 204, 0.7)",
        line: {
          color:  "rgba(0, 102, 204, 1)",
          width: 1
        }
      },
      opacity: 0.5,
      xbins: {
        end: end,
        size: 20,
        start: 0
      }
    }
  }
  private graphAfterMedRight(data: number[], end: number) {
    return {
      x: data,
      type: 'histogram',
      name: 'After medication - right hand',
      marker: {
        color: "rgba(204, 0, 102, 0.7)",
        line: {
          color:  "rgba(204, 0, 102, 1)",
          width: 1
        }
      },
      opacity: 0.5,
      xbins: {
        end: end,
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
      yaxis: {title: "Number of occurrences"}
    }
  }

}
