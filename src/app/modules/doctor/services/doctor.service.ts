import {Injectable} from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Patient} from "../../../models/user/patient/patient";
import {TestType} from "../../../models/tests/test-info";
import {Result} from "../../../models/results/result";
import {
  FingerTapping,
  Gyroscope,
  Static,
  TestDistribution,
  ToeTapping,
  Voice
} from "../../../models/tests/test-distribution";

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
      return {...patient, patientTests:patient.patientTests
          .map(test => {
              switch (test.uid) {
                case TestType.FINGER_TAPPING:
                  return FingerTapping
                case TestType.GYROSCOPE:
                  return Gyroscope
                case TestType.STATIC:
                  return Static
                case TestType.ACCELEROMETER:
                  return ToeTapping
                case TestType.VOICE:
                  return Voice
                default:
                  return null  as any as TestDistribution
              }
            }
          )}
    })))
  }

  getTest(filters: { formDate: any; toDate: any; testNameID: any }): Observable<Result[]> {
    const userId = this._selectedPatient.uid;
    return this.httpClient.post<Result[]>(`/api/result/${userId}/test`, filters)
  }

  setSelectedPatient(patient: Patient) {
    this._selectedPatient = patient
  }

  get selectedPatient(): Patient {
    return this._selectedPatient
  }
}
