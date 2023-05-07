import {Injectable} from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Patient} from "../../../models/user/patient/patient";
import {Result} from "../../../models/results/result";
import {AggregatedData} from "../../../models/analysis/analysis-data";
import {ConfigTests} from "../../../models/tests/config-tests";
import {Cacheable} from "ts-cacheable";
import {FingerTappingAnalysis} from "../../../models/analysis/finger-tapping/finger-tapping-analysis";
import {TremorAnalysis} from "../../../models/analysis/finger-tapping/TremorAnalysis";
import {SummaryPatient} from "../../../models/user/doctor/summary-patient";
import {MeanSummaryPatients} from "../../../models/user/doctor/mean-summary-patiens";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private _selectedPatient!: Patient;

  constructor(private readonly authService: AuthenticationService,
              private readonly httpClient: HttpClient) {
  }

  @Cacheable({maxAge: 36000000})
  getPatients(configTests: ConfigTests[]): Observable<Patient[]> {
    const userId = this.authService.decodedToken.userId;
    return this.httpClient.get<Patient[]>(`/api/doctor/${userId}/patients`, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
      .pipe(map(patients => patients.map(patient => {
        return {...patient, patientTests:patient.patientTests
            .map(test => {
              return {...test,
                icon:configTests.filter(configTest => test.uid === configTest.uid).map(configTest => configTest.icon)[0],
                namePL:configTests.filter(configTest => test.uid === configTest.uid).map(configTest => configTest.namePL)[0],
                name:configTests.filter(configTest => test.uid === configTest.uid).map(configTest => configTest.name)[0],
              }
            })
        }
      })))
  }

  @Cacheable({maxAge: 36000000})
  getAnalysisData(body: {testNameID: string, period:string}): Observable<FingerTappingAnalysis[]> {
    const userId = this._selectedPatient.uid;
    return this.httpClient.post<FingerTappingAnalysis[]>(`api/analysis-tests/${userId}/chart-data`, body,{headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  getTremorAnalysisData(body: { period: string; testNameID: string }): Observable<TremorAnalysis[]>  {
    const userId = this._selectedPatient.uid;
    return this.httpClient.post<TremorAnalysis[]>(`api/analysis-tests/${userId}/tremor/chart-data`, body,{headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }

  @Cacheable({maxAge: 36000000})
  getSummaryData(): Observable<SummaryPatient[]> {
    const userId = this.authService.decodedToken.userId;
    return this.httpClient.get<SummaryPatient[]>(`/api/doctor/${userId}/patients-summary/details`, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
  }

  @Cacheable({maxAge: 36000000})
  getMeanSummaryData(): Observable<MeanSummaryPatients[]> {
    const userId = this.authService.decodedToken.userId;
    return this.httpClient.get<MeanSummaryPatients[]>(`/api/doctor/${userId}/patients-summary`, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
  }

  getTestDetails(filters: { formDate: any; toDate: any; testNameID: any }): Observable<Result[]> {
    const userId = this._selectedPatient.uid;
    return this.httpClient.post<Result[]>(`/api/result/${userId}/test`, filters, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
  }

  getTest(filters: { formDate: any; toDate: any; testNameID: any }): Observable<Result[]> {
    const userId = this._selectedPatient.uid;
    return this.httpClient.post<Result[]>(`/api/test-results/${userId}`, filters, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
  }

  setSelectedPatient(patient: Patient) {
    this._selectedPatient = patient
  }

  get selectedPatient(): Patient {
    return this._selectedPatient
  }

  getAggregateDate(filters: { testNameID: string; timeRange: string }): Observable<AggregatedData[]> {
    const userId = this._selectedPatient.uid;
    return this.httpClient.post<AggregatedData[]>(`/api/analyzed/${userId}/test`, filters, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }


}
