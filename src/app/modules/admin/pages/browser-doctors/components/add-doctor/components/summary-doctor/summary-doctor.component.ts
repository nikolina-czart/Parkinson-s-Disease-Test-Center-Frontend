import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Doctor} from "../../../../../../../../models/user/admin/doctor";

@Component({
  selector: 'app-summary-doctor',
  templateUrl: './summary-doctor.component.html',
  styleUrls: ['./summary-doctor.component.scss']
})
export class SummaryDoctorComponent implements OnInit {
  @Input() doctorDataSummary!: Doctor;
  @Output() saveFormClick = new EventEmitter<boolean>;

  ngOnInit(): void {
  }

  submitForm() {
    this.saveFormClick.emit();
  }
}
