import {Component, Input, OnInit} from '@angular/core';
import {FingerTappingAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {
  FingerTappingGraphDataViolin
} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-graph-data";

@Component({
  selector: 'app-violin',
  templateUrl: './violin.component.html',
  styleUrls: ['./violin.component.css']
})
export class ViolinComponent implements OnInit {
  @Input() data!: FingerTappingAnalysis[];
  graphs: FingerTappingGraphDataViolin[] = [];

  ngOnInit(): void {
    this.data.forEach(element => {
      const dataHoldTime = [
        this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.touchTime.dataAfterMedLeft, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.touchTime.dataAfterMedRight, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      ];
      const dataHoldTimeSide = [
        this.createGraphViolin("Prawa ręka", element.data.touchTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Prawa ręka", element.data.touchTime.dataAfterMedRight, "legend-group-4", "scale-group-1", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.touchTime.dataBeforeMedLeft, "legend-group-1", "scale-group-2", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.touchTime.dataAfterMedLeft, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
      ];
      const dataHoldTimeMean = [
        this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.touchTime.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.touchTime.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      ];
      const dataHoldTimeMeanSide = [
        this.createGraphViolin("Prawa ręka", element.data.touchTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Prawa ręka", element.data.touchTime.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-1", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.touchTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-2", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.touchTime.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
      ];
      const dataUpTime = [
        this.createGraphViolin("Przed lekami", element.data.upTime.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Przed lekami", element.data.upTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.upTime.dataAfterMedLeft, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.upTime.dataAfterMedRight, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      ];
      const dataUpTimeSide = [
        this.createGraphViolin("Prawa ręka", element.data.upTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Prawa ręka", element.data.upTime.dataAfterMedRight, "legend-group-4", "scale-group-1", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.upTime.dataBeforeMedLeft, "legend-group-1", "scale-group-2", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.upTime.dataAfterMedLeft, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
      ];
      const dataUpTimeMean = [
        this.createGraphViolin("Przed lekami", element.data.upTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Przed lekami", element.data.upTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.upTime.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.upTime.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      ];
      const dataUpTimeMeanSide = [
        this.createGraphViolin("Prawa ręka", element.data.upTime.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Prawa ręka", element.data.upTime.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-1", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.upTime.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-2", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.upTime.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
      ];
      const dataIntertapInterval = [
        this.createGraphViolin("Przed lekami", element.data.intertapInterval.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Przed lekami", element.data.intertapInterval.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.intertapInterval.dataAfterMedLeft, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.intertapInterval.dataAfterMedRight, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      ];
      const dataIntertapIntervalSide = [
        this.createGraphViolin("Prawa ręka", element.data.intertapInterval.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Prawa ręka", element.data.intertapInterval.dataAfterMedRight, "legend-group-4", "scale-group-1", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.intertapInterval.dataBeforeMedLeft, "legend-group-1", "scale-group-2", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.intertapInterval.dataAfterMedLeft, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
      ];
      const dataIntertapIntervalMean = [
        this.createGraphViolin("Przed lekami", element.data.intertapInterval.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Przed lekami", element.data.intertapInterval.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.intertapInterval.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.intertapInterval.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
      ];
      const dataIntertapIntervalMeanSide = [
        this.createGraphViolin("Prawa ręka", element.data.intertapInterval.dataBeforeMedRightMeanByDays, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Prawa ręka", element.data.intertapInterval.dataAfterMedRightMeanByDays, "legend-group-4", "scale-group-1", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.intertapInterval.dataBeforeMedLeftMeanByDays, "legend-group-1", "scale-group-2", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.intertapInterval.dataAfterMedLeftMeanByDays, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
      ];

      const layoutHoldTime =  this.createLayout("Hold Time - porównanie stron", 0, 400, "Hold time [ms]");
      const layoutHoldTimeSide =  this.createLayout("Hold Time - porównanie wpływu farmakoterapi", 0, 400, "Hold time [ms]");
      const layoutHoldTimeMean =  this.createLayout("Hold Time (średnie z dni) - porównanie stron", 0, 400, "Hold time [ms]");
      const layoutHoldTimeMeanSide =  this.createLayout("Hold Time (średnie z dni)  - porównanie wpływu farmakoterapi", 0, 400, "Hold time [ms]");
      const layoutUpTime =  this.createLayout("Up Time - porównanie stron", 0, 400, "Up time [ms]");
      const layoutUpTimeSide =  this.createLayout("Up Time - porównanie wpływu farmakoterapi", 0, 400, "Up time [ms]");
      const layoutUpTimeMean =  this.createLayout("Up Time (średnie z dni) - porównanie stron", 0, 300, "Up time [ms]");
      const layoutUpTimeMeanSide =  this.createLayout("Up Time (średnie z dni)  - porównanie wpływu farmakoterapi", 0, 300, "Up time [ms]");
      const layoutIntertapInterval =  this.createLayout("Intertap Interval - porównanie stron", 0, 600, "Intertap invertal time [ms]");
      const layoutIntertapIntervalSide =  this.createLayout("Intertap Interval- porównanie wpływu farmakoterapi", 0, 600, "Intertap invertal time [ms]");
      const layoutIntertapIntervalMean =  this.createLayout("Intertap Interval (średnie z dni) - porównanie stron", 0, 600, "Intertap invertal time [ms]");
      const layoutIntertapIntervalMeanSide =  this.createLayout("Intertap Interval (średnie z dni)  - porównanie wpływu farmakoterapi", 0, 600, "Intertap invertal time [ms]");

      this.graphs.push({
        period: element.period,
        dataTouchTime: {
          data: dataHoldTime,
          layout: layoutHoldTime
        },
        dataTouchTimeSide: {
          data: dataHoldTimeSide,
          layout: layoutHoldTimeSide
        },
        dataUpTime: {
          data: dataUpTime,
          layout: layoutUpTime
        },
        dataUpTimeSide: {
          data: dataUpTimeSide,
          layout: layoutUpTimeSide
        },
        dataIntertapInterval: {
          data: dataIntertapInterval,
          layout: layoutIntertapInterval
        },
        dataIntertapIntervalSide: {
          data: dataIntertapIntervalSide,
          layout: layoutIntertapIntervalSide
        },
        dataTouchTimeMean: {
          data: dataHoldTimeMean,
          layout: layoutHoldTimeMean
        },
        dataTouchTimeMeanSide: {
          data: dataHoldTimeMeanSide,
          layout: layoutHoldTimeMeanSide
        },
        dataUpTimeMean: {
          data: dataUpTimeMean,
          layout: layoutUpTimeMean
        },
        dataUpTimeMeanSide: {
          data: dataUpTimeMeanSide,
          layout: layoutUpTimeMeanSide
        },
        dataIntertapIntervalMean: {
          data: dataIntertapIntervalMean,
          layout: layoutIntertapIntervalMean
        },
        dataIntertapIntervalMeanSide: {
          data: dataIntertapIntervalMeanSide,
          layout: layoutIntertapIntervalMeanSide
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
}
