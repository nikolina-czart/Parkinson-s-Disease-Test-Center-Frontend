import {Component, Input, OnInit} from '@angular/core';
import {FingerTappingAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {
  FingerTappingGraphData,
  FingerTappingGraphDataViolin
} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-graph-data";

@Component({
  selector: 'app-density',
  templateUrl: './density.component.html',
  styleUrls: ['./density.component.scss']
})
export class DensityComponent implements OnInit{
  @Input() data!: FingerTappingAnalysis[];
  graphs: FingerTappingGraphData[] = [];

  ngOnInit(): void {
    this.data.forEach(element => {
      const dataHoldTime = [
        this.createGraph(element.data.touchTime.dataBeforeMedLeft, "Before medication - left hand", "rgba(204, 102, 0, 0.7)"),
        this.createGraph(element.data.touchTime.dataBeforeMedRight, "Before medication - right hand", "rgba(0, 204, 102, 0.7)"),
        this.createGraph(element.data.touchTime.dataAfterMedLeft, "After medication - left hand", "rgba(0, 102, 204, 0.7)"),
        this.createGraph(element.data.touchTime.dataAfterMedRight, "After medication - right hand", "rgba(204, 0, 102, 0.7)")
      ];
      const dataUpTime = [
        this.createGraph(element.data.upTime.dataBeforeMedLeft, "Before medication - left hand", "rgba(204, 102, 0, 0.7)"),
        this.createGraph(element.data.upTime.dataBeforeMedRight, "Before medication - right hand", "rgba(0, 204, 102, 0.7)"),
        this.createGraph(element.data.upTime.dataAfterMedLeft, "After medication - left hand", "rgba(0, 102, 204, 0.7)"),
        this.createGraph(element.data.upTime.dataAfterMedRight, "After medication - right hand", "rgba(204, 0, 102, 0.7)")
      ];
      const dataIntertapInterval = [
        this.createGraph(element.data.intertapInterval.dataBeforeMedLeft, "Before medication - left hand", "rgba(204, 102, 0, 0.7)"),
        this.createGraph(element.data.intertapInterval.dataBeforeMedRight, "Before medication - right hand", "rgba(0, 204, 102, 0.7)"),
        this.createGraph(element.data.intertapInterval.dataAfterMedLeft, "After medication - left hand", "rgba(0, 102, 204, 0.7)"),
        this.createGraph(element.data.intertapInterval.dataAfterMedRight, "After medication - right hand", "rgba(204, 0, 102, 0.7)")
      ];
      const dataHoldTimeMean = [
        this.createGraph(element.data.touchTime.dataBeforeMedLeftMeanByDays, "Before medication - left hand", "rgba(204, 102, 0, 0.7)"),
        this.createGraph(element.data.touchTime.dataBeforeMedRightMeanByDays, "Before medication - right hand", "rgba(0, 204, 102, 0.7)"),
        this.createGraph(element.data.touchTime.dataAfterMedLeftMeanByDays, "After medication - left hand", "rgba(0, 102, 204, 0.7)"),
        this.createGraph(element.data.touchTime.dataAfterMedRightMeanByDays, "After medication - right hand", "rgba(204, 0, 102, 0.7)")
      ];
      const dataUpTimeMean = [
        this.createGraph(element.data.upTime.dataBeforeMedLeftMeanByDays, "Before medication - left hand", "rgba(204, 102, 0, 0.7)"),
        this.createGraph(element.data.upTime.dataBeforeMedRightMeanByDays, "Before medication - right hand", "rgba(0, 204, 102, 0.7)"),
        this.createGraph(element.data.upTime.dataAfterMedLeftMeanByDays, "After medication - left hand", "rgba(0, 102, 204, 0.7)"),
        this.createGraph(element.data.upTime.dataAfterMedRightMeanByDays, "After medication - right hand", "rgba(204, 0, 102, 0.7)")
      ];
      const dataIntertapIntervalMean = [
        this.createGraph(element.data.intertapInterval.dataBeforeMedLeftMeanByDays, "Before medication - left hand", "rgba(204, 102, 0, 0.7)"),
        this.createGraph(element.data.intertapInterval.dataBeforeMedRightMeanByDays, "Before medication - right hand", "rgba(0, 204, 102, 0.7)"),
        this.createGraph(element.data.intertapInterval.dataAfterMedLeftMeanByDays, "After medication - left hand", "rgba(0, 102, 204, 0.7)"),
        this.createGraph(element.data.intertapInterval.dataAfterMedRightMeanByDays, "After medication - right hand", "rgba(204, 0, 102, 0.7)")
      ];

      this.graphs.push({
        period: element.period,
        dataTouchTime: {
          data: dataHoldTime,
          layout: this.createLayout("Hold time", [-200, 1000], "Hold time [ms]")
        },
        dataUpTime: {
          data: dataUpTime,
          layout: this.createLayout("Up time", [-200, 600], "Up time [ms]")
        },
        dataIntertapInterval: {
          data: dataIntertapInterval,
          layout: this.createLayout("Intertap Interval", [-100, 1200], "Intertap interval time [ms]")
        },
        dataTouchTimeMean: {
          data: dataHoldTimeMean,
          layout: this.createLayout("Hold time (averages over days)", [0, 800], "Hold time [ms]")
        },
        dataUpTimeMean: {
          data: dataUpTimeMean,
          layout: this.createLayout("Up time (averages over days)", [0, 600], "Up time [ms]")
        },
        dataIntertapIntervalMean: {
          data: dataIntertapIntervalMean,
          layout: this.createLayout("Intertap Interval (averages over days)", [100, 1000], "Intertap interval time [ms]")
        },
      })
    })
  }

  private createGraph(dataBeforeMedRight: number[], name: string, color: string) {
    return {
      type: 'violin',
      x: dataBeforeMedRight,
      y0: "Dane",
      legendgroup: name,
      scalegroup: 'Scale group',
      name: name,
      side: 'positive',
      box: {
        visible: false
      },
      line: {
        color: color,
        width: 2
      },
      meanline: {
        visible: false
      }
    }
  }

  private createLayout(title: string, rangeX: number[], titleAxisX: string) {
    return {
      title: title,
      yaxis: {
        title: "Probability density function",
        showticklabels: false
      },
      xaxis: {
        title: titleAxisX,
        range: rangeX
      },
    }
  }
}
