import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpIInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const idtoken = localStorage.getItem("token");
    console.log(idtoken);

    if (idtoken) {
      const authReq = request.clone({
        headers: request.headers.set("Authorization", idtoken),
      });
      console.log(idtoken);
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
