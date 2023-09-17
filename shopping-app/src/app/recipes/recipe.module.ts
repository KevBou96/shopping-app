import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { NewRecipeComponent } from "./new-recipe/new-recipe.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from "../auth/auth.guard";
import { recipesResolverService } from "./recipe-resolver.service";
import { AppComponent } from "../app.component";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    { path: '', component: RecipesComponent, canActivate: [AuthGuard] , children: [
        { path: '', component: RecipeEditComponent},
        { path: 'new', component: RecipeEditComponent },
        { path: ':id/:name', component: RecipeDetailComponent, resolve: [recipesResolverService]},
        { path: ':id/:name/edit', component: RecipeEditComponent, resolve: [recipesResolverService]}
      ] },
]

@NgModule({
    declarations: [
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeItemComponent,
        RecipeListComponent,
        RecipesComponent,
        NewRecipeComponent
    ],
    exports: [
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeItemComponent,
        RecipeListComponent,
        RecipesComponent,
        NewRecipeComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class RecipesModule {


}