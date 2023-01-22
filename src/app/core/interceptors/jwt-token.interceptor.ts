import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";

@Injectable(
  {  providedIn: 'root'}

)
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private readonly authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("a", "Interceptors")
    const token = this.authenticationService.token;
    console.log(token, "Interceptors")
    if(token) {
      const newRequest = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });

      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
