import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserRegisterForm} from "../../../models/user/shared/user-register-form";
import {PatientUpdate} from "../../../models/user/patient/patient-update";
import {ConfigTests} from "../../../models/tests/config-tests";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private readonly httpClient: HttpClient) { }

  removePatientAccount(uid: string): Observable<string> {
    return this.httpClient.delete(`/api/user/${uid}`, {responseType: 'text'});
  }

  updatePatientData(uid: string, updates: PatientUpdate[]): Observable<string> {
    return this.httpClient.put(`/api/user/${uid}`, updates, {responseType: 'text'});
  }

  addNewTests(uid: string, testsToAdd: { uid: string; name: string }[]): Observable<string>  {
    return this.httpClient.post(`/api/patient-tests/save/${uid}`, testsToAdd, {responseType: 'text'});
  }

  removeOldTest(uid: string, testsToRemove: { uid: string; name: string }[]):Observable<string> {
   return this.httpClient.post(`/api/patient-tests/delete/${uid}`, testsToRemove, {responseType: 'text'});
  }
}
