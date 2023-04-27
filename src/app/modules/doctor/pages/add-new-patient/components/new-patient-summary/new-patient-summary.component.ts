import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Patient} from "../../../../../../models/user/patient/patient";

@Component({
  selector: 'app-new-patient-summary',
  templateUrl: './new-patient-summary.component.html',
  styleUrls: ['./new-patient-summary.component.scss']
})
export class NewPatientSummaryComponent {
  @Input() patientDataSummary!: Patient;
  @Output() saveFormClick = new EventEmitter<boolean>;
  controlGroup = false;

  submitForm() {
    this.saveFormClick.emit(this.controlGroup);
  }
}
