import {Component, Input, OnInit} from '@angular/core';
import {TremorAnalysis} from "../../../../../../../models/analysis/finger-tapping/TremorAnalysis";

@Component({
  selector: 'app-analysis-gyroscope',
  templateUrl: './analysis-gyroscope.component.html',
  styleUrls: ['./analysis-gyroscope.component.css']
})
export class AnalysisGyroscopeComponent implements OnInit {
  @Input() tremorData!: TremorAnalysis[];

  ngOnInit(): void {
    console.log(this.tremorData)
  }
}
