import {Component, Input, OnInit} from '@angular/core';
import {TremorAnalysis} from "../../../../../../../models/analysis/finger-tapping/TremorAnalysis";

@Component({
  selector: 'app-analysis-gyroscope',
  templateUrl: './analysis-gyroscope.component.html',
  styleUrls: ['./analysis-gyroscope.component.scss']
})
export class AnalysisGyroscopeComponent implements OnInit {
  @Input() tremorData!: TremorAnalysis[];
  panelOpenState = false;

  ngOnInit(): void {
  }
}
