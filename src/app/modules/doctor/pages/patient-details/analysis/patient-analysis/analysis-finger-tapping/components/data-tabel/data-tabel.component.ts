import {Component, Input, OnInit} from '@angular/core';
import {
  FingerTappingAnalysisData
} from "../../../../../../../../../models/analysis/finger-tapping/table/finger-tapping-analysis-data";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-data-tabel',
  templateUrl: './data-tabel.component.html',
  styleUrls: ['./data-tabel.component.css']
})
export class DataTabelComponent implements OnInit {
  displayedColumns: string[] = ['parameter', 'meanLeft', 'deviationLeft', 'meanRight', 'deviationRight'];
  @Input() data!: FingerTappingAnalysisData[];
  // dataSourceBeforeMed!: MatTableDataSource<FingerTappingAnalysisData>[];
  // dataSourceAfterMed!: MatTableDataSource<FingerTappingAnalysisData>[];

  ngOnInit(): void {
    console.log(this.data);
    // this.data.forEach(element => {
    //   this.dataSourceBeforeMed.push(new MatTableDataSource(element.data.dataAfterMed))
    // })
    // this.dataSource = ;
  }

}
