import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  FingerTappingAnalysis
} from "../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {Patient} from "../../../models/user/patient/patient";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {
  private _selectedPatient!: Patient;
  constructor(private readonly authService: AuthenticationService,
              private readonly httpClient: HttpClient) { }

  getAnalysisData(body: {testNameID: string, period:string}): Observable<FingerTappingAnalysis[]> {
    const userId = this._selectedPatient.uid;
    return this.httpClient.post<FingerTappingAnalysis[]>(`api/analysis-tests/${userId}/chart-data`, body,{headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
