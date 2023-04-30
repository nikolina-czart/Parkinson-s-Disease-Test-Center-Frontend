import {Component, Input} from '@angular/core';
import {
  FingerTappingAnalysisData
} from "../../../../../../../models/analysis/finger-tapping/table/finger-tapping-analysis-data";
import {
  FingerTappingAnalysisHistogram
} from "../../../../../../../models/analysis/finger-tapping/histogram/finger-tapping-analysis-histogram";

@Component({
  selector: 'app-analysis-finger-tapping',
  templateUrl: './analysis-finger-tapping.component.html',
  styleUrls: ['./analysis-finger-tapping.component.scss']
})
export class AnalysisFingerTappingComponent {
  panelOpenState = false;
  @Input() tableData!: FingerTappingAnalysisData[];
  @Input() histogramData!: FingerTappingAnalysisHistogram[];

}
