import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoadingSpinnerService} from "../services/loading-spinner.service";

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly loadingService: LoadingSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.display()
    return next.handle(request).pipe(finalize(() => this.loadingService.hide()));
  }
}
