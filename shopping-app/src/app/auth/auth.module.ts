import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from "./auth.guard";

@NgModule({
    declarations: [
        AuthComponent,
        ForgotPasswordComponent,
        SignUpComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([{ path: '', component: AuthComponent},
        { path: 'forgot-password', component: ForgotPasswordComponent},
        { path: 'signup', component: SignUpComponent},
        { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
        ]),
        SharedModule
    ]

})
export class AuthModule {
}