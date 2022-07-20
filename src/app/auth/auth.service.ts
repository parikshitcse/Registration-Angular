import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from "rxjs";
import { throwError, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) {

    }

    signUp(email: string, password: string) {
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHwIyBzgQcIatDfxsG97DSdCf5qihrrTE',

            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError));
    }
    login(email: string, password: string) {
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHwIyBzgQcIatDfxsG97DSdCf5qihrrTE',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
    }
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'an unkown error occured';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email exits Already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "Email Not Found";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Password is not correct";
                break;
        }
        return throwError(errorMessage);
    };

}

