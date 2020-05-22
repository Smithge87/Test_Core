import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs//operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
      //the next three lines came boilerplate
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    return next.handle(req).pipe(
        catchError (error => {
        if (error.status === 401){
            //unauthorized 
            return throwError(error.statusText);
        }
        if (error instanceof HttpErrorResponse){
            //checks for text passed to error from specific throw in API
            const applicationError = error.headers.get('Application-Error');
            if (applicationError){
                return throwError(applicationError);
            }
            //checks for multiple levels in the error JSON for validation error messages
            const serverError = error.error;
            let modelStateErrors = '';
            if (serverError.errors && typeof serverError.errors === 'object'){
                for (const key in serverError.errors){
                    if (serverError.error[key]){
                        modelStateErrors += serverError.errors[key] + '\n';
                    }
                }
            }
            return throwError(modelStateErrors || serverError || 'Unexpected Server Error');
        }
        })
    );
  }
}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
