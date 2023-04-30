import {Component, Input} from '@angular/core';
import {
  FingerTappingAnalysisData
} from "../../../../../../../models/analysis/finger-tapping/table/finger-tapping-analysis-data";
import {
  FingerTappingAnalysis
} from "../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis";

@Component({
  selector: 'app-analysis-finger-tapping',
  templateUrl: './analysis-finger-tapping.component.html',
  styleUrls: ['./analysis-finger-tapping.component.scss']
})
export class AnalysisFingerTappingComponent {
  panelOpenState = false;
  @Input() tableData!: FingerTappingAnalysisData[];
  @Input() histogramData!: FingerTappingAnalysis[];

}
