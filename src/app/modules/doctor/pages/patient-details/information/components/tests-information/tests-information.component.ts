import {Component, Input} from '@angular/core';
import {ConfigTests} from "../../../../../../../models/tests/config-tests";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tests-information',
  templateUrl: './tests-information.component.html',
  styleUrls: ['./tests-information.component.scss']
})
export class TestsInformationComponent {
  @Input() dataSource!: MatTableDataSource<ConfigTests>;
  @Input() showTable!: boolean;
  displayedColumns: string[] = ['testName', 'testIcon', 'startDate', 'lastDate', 'numberTest'];


}
