import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert.component";
import { LoadingSpinner } from "./loading-spinner.component";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinner,
        DropdownDirective,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinner,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule {}