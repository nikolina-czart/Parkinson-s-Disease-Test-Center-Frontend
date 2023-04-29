import {Component, Input} from '@angular/core';
import {
  FingerTappingAnalysisData
} from "../../../../../../../models/analysis/finger-tapping/finger-tapping-analysis-data";

@Component({
  selector: 'app-analysis-finger-tapping',
  templateUrl: './analysis-finger-tapping.component.html',
  styleUrls: ['./analysis-finger-tapping.component.scss']
})
export class AnalysisFingerTappingComponent {
  panelOpenState = false;
  @Input() tableData!: FingerTappingAnalysisData[];

}
