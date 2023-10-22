import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    resetPasswordSent = false;
    emailForm: FormGroup;
    error: string = null

    constructor(private router: Router, private auth: AuthService) {}

    ngOnInit(): void {
      this.emailForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email])
      })
    }

    resetPassword() {
     this.auth.resetPassword(this.emailForm.value.email).subscribe((response) => {
      this.resetPasswordSent = true
     }, (catchError) => {
      this.error = "An unknow error ocurred"
      if (catchError.error.error.message === "INVALID_EMAIL") {
        this.error = "Email is invalid"
      }
      if (catchError.error.error.message === "EMAIL_NOT_FOUND") {
        this.error = "Email does not exist in database"
      }
      this.resetPasswordSent = false
     })
    }

    goToLogin() {
      this.router.navigate(['/user'])
    }

    onHandleError() {
      this.error = null;
  }
}
