import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormService} from "../../../../../../../../core/services/form.service";

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent {
  @Output() doctorFormChange = new EventEmitter<FormGroup>;
  @Input() doctorFormGroup!: FormGroup
  hidePassword = true;
  hidePasswordConfirmation = true;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly formService: FormService) {
  }

  ngOnInit(): void {
  }

  getErrorMessage(formControlName: string): string {
    return this.formService.mapErrorMessages(this.doctorFormGroup, formControlName);
  }

  isControlValid(formControlName: string): boolean {
    return this.formService.isControlValid(this.doctorFormGroup, formControlName);
  }

  onPatientFormChange() {
    this.doctorFormChange.emit(this.doctorFormGroup);
  }
}
