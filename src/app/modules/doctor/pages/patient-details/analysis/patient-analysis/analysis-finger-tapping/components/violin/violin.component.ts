import {Component, Input, OnInit} from '@angular/core';
import {FingerTappingAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {FingerTappingGraphData} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-graph-data";
import {Plotly} from "angular-plotly.js/lib/plotly.interface";
import {
  FingerTappingAnalysisParameterDetails
} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis-parameter-details";

@Component({
  selector: 'app-violin',
  templateUrl: './violin.component.html',
  styleUrls: ['./violin.component.css']
})
export class ViolinComponent implements OnInit {
  @Input() data!: FingerTappingAnalysis[];
  graphs: FingerTappingGraphData[] = [];

  graphData!: Plotly.Data[];
  graphLayout!: Plotly.Layout;

  ngOnInit(): void {
    this.data.forEach(element => {
      const dataHoldTime = [
        this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedLeft, "legend-group-1", "scale-group-1", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Przed lekami", element.data.touchTime.dataBeforeMedRight, "legend-group-2", "scale-group-1", "Przed lekami - prawa strona", 'positive', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.touchTime.dataAfterMedLeft, "legend-group-3", "scale-group-2", "Po lekach - lewa strona", 'negative', "rgba(0, 102, 204, 0.7)"),
        this.createGraphViolin("Po lekach", element.data.touchTime.dataAfterMedRight, "legend-group-4", "scale-group-2", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
        this.createGraphViolin("Prawa ręka", element.data.touchTime.dataBeforeMedRight, "legend-group-2", "scale-group-3", "Przed lekami - prawa strona", 'negative', "rgba(0, 204, 102, 0.7)"),
        this.createGraphViolin("Prawa ręka", element.data.touchTime.dataAfterMedRight, "legend-group-4", "scale-group-3", "Po lekach - prawa strona", 'positive', "rgba(204, 0, 102, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.touchTime.dataBeforeMedLeft, "legend-group-1", "scale-group-4", "Przed lekami - lewa strona", 'negative', "rgba(204, 102, 0, 0.7)"),
        this.createGraphViolin("Lewa ręka", element.data.touchTime.dataAfterMedLeft, "legend-group-3", "scale-group-4", "Po lekach - lewa strona", 'positive', "rgba(0, 102, 204, 0.7)")
      ];
      const layoutHoldTime =  this.createLayout("Hold Time", 0, 400);

      this.graphs.push({
        period: element.period,
        dataTouchTime: {
          data: dataHoldTime,
          layout: layoutHoldTime
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
          data: [],
          layout: {}
        },
        dataUpTimeMean: {
          data: [],
          layout: {}
        },
        dataIntertapIntervalMean: {
          data: [],
          layout: {}
        },
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

  private createLayout(title: string, minRangeY: number, maxRangeY: number) {
    return {
      title: title,
      yaxis: {
        zeroline: false,
        range: [minRangeY, maxRangeY]
      },
    }
  }
}
