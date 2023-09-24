import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  signupForm: FormGroup;
  passwordPattern: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
  isLoading = false;
  error: string = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'lastname': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern(this.passwordPattern)])
    })
  }

  signUpUser() {
    this.isLoading = true;
    let email: string = this.signupForm.value.email;
    let password: string = this.signupForm.value.password;
    this.auth.signup(email, password)
    .subscribe(responseData => {
      this.auth.sendEmailVerification(responseData.idToken)
      .subscribe(response => {
        console.log(response)
      })
      this.router.navigate(['login']).then(() =>{
        this.isLoading = false;
      })  
    }, (catchError) => {
      this.error = catchError
      this.isLoading = false
    })
    this.signupForm.reset()
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

  onHandleError() {
    this.error = null;
  }
} 
