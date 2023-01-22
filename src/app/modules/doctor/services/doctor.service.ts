import {Injectable} from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Patient} from "../../../models/user/patient";
import {TestName} from "../../../models/tests/test-name";
import {FingerTapping} from "../../../models/tests/finger-tapping";
import {Gyroscope} from "../../../models/tests/gyroscope";
import {Test} from "../../../models/tests/test";
import {TestType} from "../../../models/tests/test-type";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private _selectedPatient!: Patient;

  constructor(private readonly authService: AuthenticationService,
              private readonly httpClient: HttpClient) {
  }

  getPatients(): Observable<Patient[]> {
    const userId = this.authService.decodedToken.userId;
    return this.httpClient.get<Patient[]>(`/api/doctor/${userId}/patient`).pipe(map(patients =>  patients.map(patient => {
        return {...patient, patientTests:patient.patientTests.map(test => {
          console.log(test)
          switch (test.uid) {
            case TestType.FINGER:
              return new FingerTapping() as Test
            case TestType.GYROSCOPE:
              return new Gyroscope() as Test
            default:
              return null  as any as Test
          }
          })}
    })))
  }


  setSelectedPatient(patient: Patient) {
    this._selectedPatient = patient
  }

  get selectedPatient(): Patient {
    return this._selectedPatient
  }
}
