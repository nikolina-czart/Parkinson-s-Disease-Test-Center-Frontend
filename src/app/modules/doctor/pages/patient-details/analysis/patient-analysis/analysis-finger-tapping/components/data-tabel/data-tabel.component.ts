import {Component, Input, OnInit} from '@angular/core';
import {
  FingerTappingAnalysisData
} from "../../../../../../../../../models/analysis/finger-tapping/table/finger-tapping-analysis-data";
import {FingerTappingAnalysis} from "../../../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";

@Component({
  selector: 'app-data-tabel',
  templateUrl: './data-tabel.component.html',
  styleUrls: ['./data-tabel.component.scss']
})
export class DataTabelComponent implements OnInit {
  displayedColumns: string[] = ['parameter', 'meanLeft', 'deviationLeft', 'meanRight', 'deviationRight'];
  @Input() data!: FingerTappingAnalysis[];
  dataSource: FingerTappingAnalysisData[] = []
  ngOnInit(): void {
    this.data.forEach(element => {
      const touchTimeBeforeMedLeft = this.calculateStandardDeviation(element.data.touchTime.dataBeforeMedLeft)
      const touchTimeBeforeMedRight = this.calculateStandardDeviation(element.data.touchTime.dataBeforeMedRight)
      const touchTimeAfterMedLeft = this.calculateStandardDeviation(element.data.touchTime.dataAfterMedLeft)
      const touchTimeAfterMedRight = this.calculateStandardDeviation(element.data.touchTime.dataAfterMedRight)

      const upTimeBeforeMedLeft = this.calculateStandardDeviation(element.data.upTime.dataBeforeMedLeft)
      const upTimeBeforeMedRight = this.calculateStandardDeviation(element.data.upTime.dataBeforeMedRight)
      const upTimeAfterMedLeft = this.calculateStandardDeviation(element.data.upTime.dataAfterMedLeft)
      const upTimeAfterMedRight = this.calculateStandardDeviation(element.data.upTime.dataAfterMedRight)

      const intertapIntervalBeforeMedLeft = this.calculateStandardDeviation(element.data.intertapInterval.dataBeforeMedLeft)
      const intertapIntervalBeforeMedRight = this.calculateStandardDeviation(element.data.intertapInterval.dataBeforeMedRight)
      const intertapIntervalAfterMedLeft = this.calculateStandardDeviation(element.data.intertapInterval.dataAfterMedLeft)
      const intertapIntervalAfterMedRight = this.calculateStandardDeviation(element.data.intertapInterval.dataAfterMedRight)

      this.dataSource.push(<FingerTappingAnalysisData>{
        period: element.period,
        data: {
          dataBeforeMed: [
            {
              name: "Touch Time",
              meanLeft: touchTimeBeforeMedLeft.mean,
              deviationLeft: touchTimeBeforeMedLeft.standardDeviation,
              meanRight: touchTimeBeforeMedRight.mean,
              deviationRight: touchTimeBeforeMedRight.standardDeviation
            },
            {
              name: "Up Time",
              meanLeft: upTimeBeforeMedLeft.mean,
              deviationLeft: upTimeBeforeMedLeft.standardDeviation,
              meanRight: upTimeBeforeMedRight.mean,
              deviationRight: upTimeBeforeMedRight.standardDeviation
            },
            {
              name: "Intertap Interval",
              meanLeft: intertapIntervalBeforeMedLeft.mean,
              deviationLeft: intertapIntervalBeforeMedLeft.standardDeviation,
              meanRight: intertapIntervalBeforeMedRight.mean,
              deviationRight: intertapIntervalBeforeMedRight.standardDeviation
            },
          ],
          dataAfterMed: [
            {
              name: "Touch Time",
              meanLeft: touchTimeAfterMedLeft.mean,
              deviationLeft: touchTimeAfterMedLeft.standardDeviation,
              meanRight: touchTimeAfterMedRight.mean,
              deviationRight: touchTimeAfterMedRight.standardDeviation
            },
            {
              name: "Up Time",
              meanLeft: upTimeAfterMedLeft.mean,
              deviationLeft: upTimeAfterMedLeft.standardDeviation,
              meanRight: upTimeAfterMedRight.mean,
              deviationRight: upTimeAfterMedRight.standardDeviation
            },
            {
              name: "Intertap Interval",
              meanLeft: intertapIntervalAfterMedLeft.mean,
              deviationLeft: intertapIntervalAfterMedLeft.standardDeviation,
              meanRight: intertapIntervalAfterMedRight.mean,
              deviationRight: intertapIntervalAfterMedRight.standardDeviation
            },
          ]
        }
      })
    })
  }

  calculateStandardDeviation(x: number[]) {
    if(x.length !== 0) {
      const n = x.length;
      const meanData = x.reduce((a, b) => a + b) / n;
      const squaredDifferences = x.map(value => Math.pow(value - meanData, 2));
      const sumOfSquaredDifferences = squaredDifferences.reduce((a, b) => a + b);
      const standardDeviationData = Math.sqrt(sumOfSquaredDifferences / n);

      const mean = Math.round(meanData);
      const standardDeviation = Math.round(standardDeviationData);
      return {mean: mean, standardDeviation: standardDeviation}
    }
    return {mean: '-', standardDeviation: '-'}
  }
}
