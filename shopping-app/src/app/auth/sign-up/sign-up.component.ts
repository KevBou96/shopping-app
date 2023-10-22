import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, last } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { User, IUser } from '../user.model';


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

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {}

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
    let name: string = this.signupForm.value.name;
    let lastName: string = this.signupForm.value.lastname;
    this.auth.signup(email, password)
    .subscribe(responseData => {
      console.log(responseData)
      const newUser: IUser = {
        name: name, 
        lastName: lastName, 
        email: email,
        id: responseData.localId,
        emailVerified: false
      }
      this.userService.addUserToDatabase(newUser)
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
    this.router.navigate(['/user'])
  }

  onHandleError() {
    this.error = null;
  }
} 
