import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.development"; 
import { response } from "express";

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
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer = null;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseApiKey
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
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseApiKey
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
                this.autoLogOut(expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user))
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        )
        if (loadedUser.Token) {
            this.user.next(loadedUser)
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogOut(expirationDuration);
        }
    }
        

    logOut() {
        this.user.next(null);
        this.router.navigate(['/login'])
        localStorage.removeItem('userData')
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
    }

    autoLogOut(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut()
        }, expirationDuration);
    }

    getUser() {
        this.user.subscribe(user => {
            const newUser = user
            return newUser
        })
       
    }

    resetPassword(email: string) {
        return this.http.post<string>('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + environment.fireBaseApiKey,
        {
            requestType: "PASSWORD_RESET",
            email: email 
        })
    }
}