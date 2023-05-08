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
import { saveAs } from 'file-saver';

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
                nameEN:configTests.filter(configTest => test.uid === configTest.uid).map(configTest => configTest.nameEN)[0],
                name:configTests.filter(configTest => test.uid === configTest.uid).map(configTest => configTest.name)[0],
              }
            })
        }
      })))
  }

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


  // saveTestsToFile(bodyRequest: { testIDs: string[]; patientName: string; testNameID: string; patientSurname: string }) {
  //   const userId = this._selectedPatient.uid;
  //
  //
  //   return this.httpClient.post<string>(`/api/doctor/${userId}/save-data-to-file`, bodyRequest, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  // }
  saveTestsToFile(selectedPatient: Patient, testName: string, uniqueDates: Result[]) {
    const userId = this._selectedPatient.uid;
    const startFileName = `${testName.trimStart()}_${selectedPatient.name}_${selectedPatient.surname}`

    uniqueDates.forEach(data => {
      const fileName = `${startFileName}_${data.date.replaceAll(' ', '_').replaceAll(':', '-')}_${data.side}.txt`
      const body = {
        testName: testName,
        testId: data.date,
        fileName: fileName,
        side: data.side
      }
      this.httpClient.post(`/api/doctor/${userId}/save-data-to-file`, body, { responseType: 'blob' })
        .subscribe(response => {
          const blob = new Blob([response], { type: 'text/plain' });
          const file = new File([blob], fileName, { type: 'text/plain' });

          saveAs(file);
        });
    })
  }
}
