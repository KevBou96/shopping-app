import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKby3KpAh5zpsqUsykc-KORteMEwhdq4Q'
        ,{  
            email: email, 
            password: password, 
            returnSecureToken: true 
        }
        ).pipe(catchError(errorResponse => {
            console.log(errorResponse);
            let errorMessage = 'An unknown error ocurred!'
            if (errorResponse.error.error.message === "EMAIL_EXISTS") {
                errorMessage = 'Email already exists!';
            } 
            return throwError(errorMessage);
        }), tap(responseData => {
            this.handleAuth(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
        })
        )
    }

    signin(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKby3KpAh5zpsqUsykc-KORteMEwhdq4Q'
        , {
            email: email, 
            password: password, 
            returnSecureToken: true 
        }
        ).pipe(catchError(errorResponse => {
            console.log(errorResponse);
            let errorMessage = 'An unknown error ocurred!'
            if (errorResponse.error.error.message === "INVALID_PASSWORD") {
                errorMessage = 'Your password is incorrect!'
            } 
            if (errorResponse.error.error.message === "EMAIL_NOT_FOUND") {
                errorMessage = 'Email do not exists!';
            }
            return throwError(errorMessage);
        }), tap(responseData => {
            this.handleAuth(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }))
    }

    private handleAuth(email: string, localId: string, idToken: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn *1000)
            const user = new User(
                email,
                localId,
                idToken,
                expirationDate
                );
                this.user.next(user);
    }
}