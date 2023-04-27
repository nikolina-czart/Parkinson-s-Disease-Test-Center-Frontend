import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigTests} from "../../../models/tests/config-tests";
import {Cacheable} from "ts-cacheable";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private readonly httpClient: HttpClient) { }

  @Cacheable({maxAge: 36000000})
  configTest(): Observable<ConfigTests[]> {
    return this.httpClient.get<ConfigTests[]>(`/api/config/test`);

  }
}
