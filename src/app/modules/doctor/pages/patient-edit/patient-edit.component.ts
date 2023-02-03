import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../../models/user/patient";
import {Router} from "@angular/router";
import {DoctorService} from "../../services/doctor.service";
import {FormBuilder, Validators} from "@angular/forms";
import {passwordMatchValidator} from "../../../../core/validators/password-match.validator";

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit{
  selectedPatient!: Patient;

  constructor(private readonly _formBuilder: FormBuilder,
              private router: Router,
              private doctorService: DoctorService) {
  }

  newPatientFormGroup = this._formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), passwordMatchValidator('passwordConfirmation', true)]],
    passwordConfirmation: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), passwordMatchValidator('password')]]
  });

  ngOnInit() {
    this.selectedPatient = this.doctorService.selectedPatient;
  }
}
