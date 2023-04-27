import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserRegisterForm} from "../../../models/user/shared/user-register-form";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private readonly httpClient: HttpClient) { }

  removePatientAccount(uid: string): Observable<string> {
    return this.httpClient.delete<string>(`/api/user/${uid}`);
  }

  updatePatientData(editPatientForm: UserRegisterForm, uid: string): Observable<string> {
    return this.httpClient.put<string>(`/api/user/${uid}`, editPatientForm);
  }
}
