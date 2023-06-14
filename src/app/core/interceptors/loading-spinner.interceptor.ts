import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoadingSpinnerService} from "../services/loading-spinner.service";
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly loadingService: LoadingSpinnerService,
              private readonly tokenService: TokenService,
              private readonly router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.tokenService.isTokenValid()){
      this.loadingService.display()
    }else {
      this.router.navigateByUrl("/login")
    }
    return next.handle(request).pipe(finalize(() => this.loadingService.hide()));
  }
}
