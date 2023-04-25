import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {testCheckboxesSelector} from "../../../../../../models/tests/test-checkboxes-selector";
import {ConfigTests} from "../../../../../../models/tests/config-tests";

@Component({
  selector: 'app-new-patient-tests-checked',
  templateUrl: './new-patient-tests-checked.component.html',
  styleUrls: ['./new-patient-tests-checked.component.scss']
})
export class NewPatientTestsCheckedComponent implements OnInit {
  @Input() tests!: ConfigTests[];
  @Output() selectedTestsChange = new EventEmitter<ConfigTests[]>();
  testCheckboxesSelector!: testCheckboxesSelector[];
  selectedTests: ConfigTests[] = []

  constructor(private readonly _formBuilder: FormBuilder) {
    console.log("Dziecko: tests")
  }

  ngOnInit(): void {
    this.testCheckboxesSelector = this.tests.map(test => ({...test, checked: false}))
  }

  changeCheckbox(test: testCheckboxesSelector) {
    test.checked = !test.checked
    this.selectedTests = this.testCheckboxesSelector.filter(test => test.checked)
  }

  onSelectedTestsChange() {
    this.selectedTestsChange.emit(this.selectedTests)
  }
}
