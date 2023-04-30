import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  FingerTappingAnalysisHistogram
} from "../../../models/analysis/finger-tapping/histogram/finger-tapping-analysis-histogram";

@Injectable({
  providedIn: 'root'
})
export class AnalysisDataService {

  constructor(private readonly httpClient: HttpClient) { }

  getAnalysisData(body: {testNameID: string, period:string}): Observable<FingerTappingAnalysisHistogram[]> {
    return this.httpClient.post<FingerTappingAnalysisHistogram[]>(`api/analysis-tests/2/chart-data`, body,{headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
