import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(private readonly auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const dupReq = req.clone({});
    dupReq.headers.append(
      'authorization',
      'Bearer ' + sessionStorage.getItem('TOKEN')!
    );
    return next.handle(dupReq);
  }
}
