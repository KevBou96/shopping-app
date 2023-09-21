import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { catchError } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./user.model";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    authForm: FormGroup;
    isLoading = false;
    error: string = null;
    user: User = null;

    constructor(private auth: AuthService, private router: Router) {}

  

    ngOnInit(): void {
        this.authForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        })
    }

    Authenticate() {
        this.isLoading = true;
        let email: string = this.authForm.value.email;
        let password: string = this.authForm.value.password;
        this.auth.signin(email, password)
            .subscribe(responseData => {
                this.router.navigate(['recipes']).then(() =>
                    this.isLoading = false)
                console.log(responseData)
            }, (catchError) => {
                this.isLoading = false;
                this.error = catchError
            })
        // else {
        //     this.auth.signup(email, password)
        // .subscribe(responseData => {
        //     this.isLoading = false;
        //     this.router.navigate(['/recipes'])
        //     console.log(responseData)
        // }, (catchError) => {
        //     this.isLoading = false;
        //     this.error = catchError
        // })
        // }
        this.authForm.reset()
    }

    onHandleError() {
        this.error = null;
    }

    signUp() {
        this.router.navigate(['signup'])
    }

    forgotPassword() {
        this.router.navigate(['/login/forgot-password'])
    }
}