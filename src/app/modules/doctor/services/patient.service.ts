import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserAddForm} from "../../../models/user/shared/user-add-form";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private readonly httpClient: HttpClient) { }

  removePatientAccount(uid: string): Observable<string> {
    return this.httpClient.delete<string>(`/api/user/${uid}`);
  }

  updatePatientData(editPatientForm: UserAddForm, uid: string): Observable<string> {
    return this.httpClient.put<string>(`/api/user/${uid}`, editPatientForm);
  }
}
