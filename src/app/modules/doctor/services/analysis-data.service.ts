import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  FingerTappingAnalysis
} from "../../../models/analysis/finger-tapping/finger-tapping-analysis";

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {

  constructor(private readonly httpClient: HttpClient) { }

  getAnalysisData(body: {testNameID: string, period:string}): Observable<FingerTappingAnalysis[]> {
    return this.httpClient.post<FingerTappingAnalysis[]>(`api/analysis-tests/2/chart-data`, body,{headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
