import { Injectable } from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigTests} from "../../../models/tests/config-tests";
import {map, Observable} from "rxjs";
import {Patient} from "../../../models/user/patient/patient";
import {Doctor} from "../../../models/user/admin/doctor";
import {TremorAnalysis} from "../../../models/analysis/finger-tapping/TremorAnalysis";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getDoctors(): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(`/api/admin/all-doctor`, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  removeDoctorAccount(doctorToRemove: Doctor): Observable<string> {
    const uid = doctorToRemove.uid;
    return this.httpClient.delete(`/api/admin/remove/${uid}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text'
    });
  }
}
