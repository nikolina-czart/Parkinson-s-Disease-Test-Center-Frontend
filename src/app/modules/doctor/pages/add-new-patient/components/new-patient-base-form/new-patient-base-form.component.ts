import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormService} from "../../../../../../core/services/form.service";
import {createNewUserFormGroup} from "../../../../../../../utils/form-utils";

@Component({
  selector: 'app-new-patient-base-form',
  templateUrl: './new-patient-base-form.component.html',
  styleUrls: ['./new-patient-base-form.component.scss']
})
export class NewPatientBaseFormComponent implements OnInit {
  @Output() patientFormChange = new EventEmitter<FormGroup>;
  @Input() patientFormGroup!: FormGroup
  hidePassword = true;
  hidePasswordConfirmation = true;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly formService: FormService) {
    console.log("Dziecko: base-form")
  }

  ngOnInit(): void {
  }

  getErrorMessage(formControlName: string): string {
    return this.formService.mapErrorMessages(this.patientFormGroup, formControlName);
  }

  isControlValid(formControlName: string): boolean {
    return this.formService.isControlValid(this.patientFormGroup, formControlName);
  }

  onPatientFormChange() {
    this.patientFormChange.emit(this.patientFormGroup);
  }
}
