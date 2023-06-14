import {Component, Input, OnInit} from '@angular/core';
import {FingerTappingAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {
  FingerTappingDataParameter,
  FingerTappingGraphData, FingerTappingGraphDataMeans
} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-graph-data";
import {
  FingerTappingAnalysisParameterDetails
} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis-parameter-details";

@Component({
  selector: 'app-mean-plot',
  templateUrl: './mean-plot.component.html',
  styleUrls: ['./mean-plot.component.scss']
})
export class MeanPlotComponent implements OnInit {
  @Input() data!: FingerTappingAnalysis[];
  graphs: FingerTappingGraphDataMeans[] = [];
  showGraphTouchTimeAfterMed = true;
  showGraphUpTimeAfterMed = true;
  showGraphIntertapIntervalAfterMed = true;

  ngOnInit(): void {
    this.data.forEach(element => {
      this.showGraphTouchTimeAfterMed = element.data.touchTime.dataAfterMedRight.length === 0;
      this.showGraphUpTimeAfterMed = element.data.upTime.dataAfterMedRight.length === 0;
      this.showGraphIntertapIntervalAfterMed = element.data.intertapInterval.dataAfterMedRight.length === 0;

      this.graphs.push({
        period: element.period,
        touchTimeBeforeLeft: {
          data: this.createGraph(element.data.touchTime.dataBeforeMedLeftMeanByDays, "Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", "x1", "y1"),
          layout: this.createLayout("Hold Time - Before medicines, Left hand", "Średnia arytmetyczna HT [ms]", this.getMaxRangeY(element.data.touchTime))
        },
        touchTimeBeforeRight: {
          data: this.createGraph(element.data.touchTime.dataBeforeMedRightMeanByDays, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", "x2", "y2"),
          layout: this.createLayout("Hold Time - Before medicines, Right hand", "Średnia arytmetyczna HT [ms]", this.getMaxRangeY(element.data.touchTime))
        },
        upTimeBeforeLeft: {
          data: this.createGraph(element.data.upTime.dataBeforeMedLeftMeanByDays, "Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", "x1", "y1"),
          layout: this.createLayout("Up Time - Before medicines, Left hand", "Średnia arytmetyczna UT [ms]",  this.getMaxRangeY(element.data.upTime))
        },
        upTimeBeforeRight: {
          data: this.createGraph(element.data.upTime.dataBeforeMedRightMeanByDays,"Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", "x2", "y2"),
          layout: this.createLayout("Up Time - Before medicines, Right hand", "Średnia arytmetyczna UT [ms]",  this.getMaxRangeY(element.data.upTime))
        },
        intertapIntervalBeforeLeft: {
          data: this.createGraph(element.data.intertapInterval.dataBeforeMedLeftMeanByDays,  "Before medication - left hand", "rgba(204, 102, 0, 1)","rgba(204, 102, 0, 0.7)", "x1", "y1"),
          layout: this.createLayout("Intertap Interval - Before medicines, Left hand", "Średnia arytmetyczna IIT[ms]",  this.getMaxRangeY(element.data.intertapInterval))
        },
        intertapIntervalBeforeRight: {
          data: this.createGraph(element.data.intertapInterval.dataBeforeMedRightMeanByDays, "Before medication - right hand", "rgba(0, 204, 102, 1)","rgba(0, 204, 102, 0.7)", "x2", "y2"),
          layout: this.createLayout("Intertap Interval - Before medicines, Right hand", "Średnia arytmetyczna IIT[ms]",  this.getMaxRangeY(element.data.intertapInterval))
        },
        touchTimeAfterLeft: {
          data: this.createGraph(element.data.touchTime.dataAfterMedLeftMeanByDays, "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", "x3", "y3"),
          layout: this.createLayout("Hold Time - After medication, Left hand", "Średnia arytmetyczna HT [ms]", this.getMaxRangeY(element.data.touchTime))
        },
        touchTimeAfterRight: {
          data: this.createGraph(element.data.touchTime.dataAfterMedRightMeanByDays, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", "x4", "y4"),
          layout: this.createLayout("Hold Time - After medication, Right hand", "Średnia arytmetyczna HT [ms]", this.getMaxRangeY(element.data.touchTime))
        },
        upTimeAfterLeft: {
          data: this.createGraph(element.data.upTime.dataAfterMedLeftMeanByDays,  "After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", "x3", "y3"),
          layout: this.createLayout("Up Time - After medication, Left hand", "Średnia arytmetyczna UT [ms]",  this.getMaxRangeY(element.data.upTime))
        },
        upTimeAfterRight: {
          data: this.createGraph(element.data.upTime.dataAfterMedRightMeanByDays, "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", "x4", "y4"),
          layout: this.createLayout("Up Time - After medication, Right hand", "Średnia arytmetyczna UT [ms]",  this.getMaxRangeY(element.data.upTime))
        },
        intertapIntervalAfterLeft: {
          data: this.createGraph(element.data.intertapInterval.dataAfterMedLeftMeanByDays,"After medication - left hand", "rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.7)", "x3", "y3"),
          layout: this.createLayout("Intertap Interval - After medication, Left hand", "Średnia arytmetyczna IIT[ms]",  this.getMaxRangeY(element.data.intertapInterval))
        },
        intertapIntervalAfterRight: {
          data:  this.createGraph(element.data.intertapInterval.dataAfterMedRightMeanByDays,  "After medication - right hand", "rgba(204, 0, 102, 1)","rgba(204, 0, 102, 0.7)", "x4", "y4"),
          layout: this.createLayout("Intertap Interval - After medication, Right hand", "Średnia arytmetyczna IIT[ms]",  this.getMaxRangeY(element.data.intertapInterval))
        }
      })
    })
  }

  private createGraph(data: number[], name:string, colorLine:string, colorPoint: string, xaxis: string, yaxis: string) {
    const y = this.createNumberArray(data.length);

    return [{
      x: y,
      y: data,
      mode: 'lines+markers',
      name: name,
      marker: {
        color: colorPoint,
        size: 3
      },
      line: {
        color: colorLine,
        width: 1
      },
    }]
  }
  private createNumberArray(length:number):number[] {
    const numberArray = [];
    for (let i = 0; i < length; i++) {
      numberArray.push(i);
    }
    return numberArray;
  }

  private createLayout(title: string, titleY: string, maxRangeY: number) {
    return {
      title: title,
      yaxis: {
        title: titleY,
        range: [0, maxRangeY]
      },
      xaxis: {
        title: "Test number [-]",
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
