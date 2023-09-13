import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.user.pipe(take(1), exhaustMap(user => {
            if (!user) {
                return next.handle(req)
            }
            const modifiedRequest = req.clone({
                params: new HttpParams().set('auth', user.Token)
            });
            return next.handle(modifiedRequest)
        }))
    }
}