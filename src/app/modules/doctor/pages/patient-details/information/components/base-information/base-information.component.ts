import {Component, Input} from '@angular/core';
import {Patient} from "../../../../../../../models/user/patient/patient";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-base-information',
  templateUrl: './base-information.component.html',
  styleUrls: ['./base-information.component.scss']
})
export class BaseInformationComponent {
  @Input() patient!: Patient
}
