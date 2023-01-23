import {Injectable} from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {HttpClient} from "@angular/common/http";
import {catchError, from, map, Observable, of, switchMap, tap} from "rxjs";
import {Patient} from "../../../models/user/patient";
import {TestName} from "../../../models/tests/test-name";
import {FingerTapping} from "../../../models/tests/finger-tapping";
import {Gyroscope} from "../../../models/tests/gyroscope";
import {Test} from "../../../models/tests/test";
import {TestType} from "../../../models/tests/test-type";
import {Result} from "../../../models/results/result";
import {UserRegisterForm} from "../../../models/user/user-register-form";
import {Voice} from "../../../models/tests/voice";
import {Static} from "../../../models/tests/static";
import {ToeTapping} from "../../../models/tests/toe-tapping";

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
          switch (test.uid) {
            case TestType.FINGER:
              return new FingerTapping() as Test
            case TestType.GYROSCOPE:
              return new Gyroscope() as Test
            case TestType.STATIC:
              return new Static() as Test
            case TestType.ACCELEROMETER:
              return new ToeTapping() as Test
            case TestType.VOICE:
              return new Voice() as Test
            default:
              return null  as any as Test
          }
          })}
    })))
  }

  getTest(filters: { formDate: any; toDate: any; testNameID: any }): Observable<Result[]> {
    const userId = this._selectedPatient.uid;
    return this.httpClient.post<Result[]>(`/api/result/${userId}/fingertapping`, filters)
  }

  setSelectedPatient(patient: Patient) {
    this._selectedPatient = patient
  }

  get selectedPatient(): Patient {
    return this._selectedPatient
  }
}
