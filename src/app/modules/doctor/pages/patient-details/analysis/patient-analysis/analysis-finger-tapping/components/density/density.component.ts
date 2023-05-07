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
        this.createGraph(element.data.touchTime.dataBeforeMedLeft, "Przed lekami - lewa strona", "rgba(204, 102, 0, 0.7)"),
        this.createGraph(element.data.touchTime.dataBeforeMedRight, "Przed lekami - prawa strona", "rgba(0, 204, 102, 0.7)"),
        this.createGraph(element.data.touchTime.dataAfterMedLeft, "Po lekach - lewa strona", "rgba(0, 102, 204, 0.7)"),
        this.createGraph(element.data.touchTime.dataAfterMedRight, "Po lekach - prawa strona", "rgba(204, 0, 102, 0.7)")
      ];
      const dataUpTime = [
        this.createGraph(element.data.upTime.dataBeforeMedLeft, "Przed lekami - lewa strona", "rgba(204, 102, 0, 0.7)"),
        this.createGraph(element.data.upTime.dataBeforeMedRight, "Przed lekami - prawa strona", "rgba(0, 204, 102, 0.7)"),
        this.createGraph(element.data.upTime.dataAfterMedLeft, "Po lekach - lewa strona", "rgba(0, 102, 204, 0.7)"),
        this.createGraph(element.data.upTime.dataAfterMedRight, "Po lekach - prawa strona", "rgba(204, 0, 102, 0.7)")
      ];
      const dataIntertapInterval = [
        this.createGraph(element.data.intertapInterval.dataBeforeMedLeft, "Przed lekami - lewa strona", "rgba(204, 102, 0, 0.7)"),
        this.createGraph(element.data.intertapInterval.dataBeforeMedRight, "Przed lekami - prawa strona", "rgba(0, 204, 102, 0.7)"),
        this.createGraph(element.data.intertapInterval.dataAfterMedLeft, "Po lekach - lewa strona", "rgba(0, 102, 204, 0.7)"),
        this.createGraph(element.data.intertapInterval.dataAfterMedRight, "Po lekach - prawa strona", "rgba(204, 0, 102, 0.7)")
      ];
      const dataHoldTimeMean = [
        this.createGraph(element.data.touchTime.dataBeforeMedLeftMeanByDays, "Przed lekami - lewa strona", "rgba(204, 102, 0, 0.7)"),
        this.createGraph(element.data.touchTime.dataBeforeMedRightMeanByDays, "Przed lekami - prawa strona", "rgba(0, 204, 102, 0.7)"),
        this.createGraph(element.data.touchTime.dataAfterMedLeftMeanByDays, "Po lekach - lewa strona", "rgba(0, 102, 204, 0.7)"),
        this.createGraph(element.data.touchTime.dataAfterMedRightMeanByDays, "Po lekach - prawa strona", "rgba(204, 0, 102, 0.7)")
      ];
      const dataUpTimeMean = [
        this.createGraph(element.data.upTime.dataBeforeMedLeftMeanByDays, "Przed lekami - lewa strona", "rgba(204, 102, 0, 0.7)"),
        this.createGraph(element.data.upTime.dataBeforeMedRightMeanByDays, "Przed lekami - prawa strona", "rgba(0, 204, 102, 0.7)"),
        this.createGraph(element.data.upTime.dataAfterMedLeftMeanByDays, "Po lekach - lewa strona", "rgba(0, 102, 204, 0.7)"),
        this.createGraph(element.data.upTime.dataAfterMedRightMeanByDays, "Po lekach - prawa strona", "rgba(204, 0, 102, 0.7)")
      ];
      const dataIntertapIntervalMean = [
        this.createGraph(element.data.intertapInterval.dataBeforeMedLeftMeanByDays, "Przed lekami - lewa strona", "rgba(204, 102, 0, 0.7)"),
        this.createGraph(element.data.intertapInterval.dataBeforeMedRightMeanByDays, "Przed lekami - prawa strona", "rgba(0, 204, 102, 0.7)"),
        this.createGraph(element.data.intertapInterval.dataAfterMedLeftMeanByDays, "Po lekach - lewa strona", "rgba(0, 102, 204, 0.7)"),
        this.createGraph(element.data.intertapInterval.dataAfterMedRightMeanByDays, "Po lekach - prawa strona", "rgba(204, 0, 102, 0.7)")
      ];

      this.graphs.push({
        period: element.period,
        dataTouchTime: {
          data: dataHoldTime,
          layout: this.createLayout("Hold time", [0, 600], "Hold time [ms]")
        },
        dataUpTime: {
          data: dataUpTime,
          layout: this.createLayout("Up time", [0, 600], "Up time [ms]")
        },
        dataIntertapInterval: {
          data: dataIntertapInterval,
          layout: this.createLayout("Intertap Interval", [0, 600], "Intertap interval time [ms]")
        },
        dataTouchTimeMean: {
          data: dataHoldTimeMean,
          layout: this.createLayout("Hold time (średnie z dni)", [0, 600], "Hold time [ms]")
        },
        dataUpTimeMean: {
          data: dataUpTimeMean,
          layout: this.createLayout("Up time (średnie z dni)", [0, 600], "Up time [ms]")
        },
        dataIntertapIntervalMean: {
          data: dataIntertapIntervalMean,
          layout: this.createLayout("Intertap Interval (średnie z dni)", [0, 600], "Intertap interval time [ms]")
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
        title: "Wykres gętości prawdopodobieństwa",
        showticklabels: false
      },
      xaxis: {
        title: titleAxisX
      },
    }
  }
}
