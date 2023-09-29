import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from "./sign-up/sign-up.component";

@NgModule({
    declarations: [
        AuthComponent,
        ForgotPasswordComponent,
        SignUpComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{ path: '', component: AuthComponent},
        { path: 'forgot-password', component: ForgotPasswordComponent},
        { path: 'signup', component: SignUpComponent},
        ]),
        SharedModule
    ]

})
export class AuthModule {
}