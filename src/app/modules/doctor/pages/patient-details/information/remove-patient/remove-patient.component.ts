import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-remove-patient',
  templateUrl: './remove-patient.component.html',
  styleUrls: ['./remove-patient.component.scss']
})
export class RemovePatientComponent {

  constructor(private dialogRef: MatDialogRef<RemovePatientComponent>) {
  }

  removePatient() {
    this.dialogRef.close(true);
  }

  cancelDialog() {
    this.dialogRef.close(false);
  }

}
