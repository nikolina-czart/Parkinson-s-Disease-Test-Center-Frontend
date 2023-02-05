import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {PatientEditComponent} from "../patient-edit/patient-edit.component";

@Component({
  selector: 'app-remove-patient',
  templateUrl: './remove-patient.component.html',
  styleUrls: ['./remove-patient.component.scss']
})
export class RemovePatientComponent {

  constructor(private dialogRef: MatDialogRef<PatientEditComponent>) {
  }

  removePatient() {
    this.dialogRef.close(true);
  }

  cancelDialog() {
    this.dialogRef.close(false);

  }
}
