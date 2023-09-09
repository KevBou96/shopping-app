import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";

@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
        ) {}

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put<any>(
            'https://shopping-app-794be-default-rtdb.firebaseio.com/recipes.json',
            recipes
        ).subscribe(responseData => {
            console.log(responseData)
        })
    }
    
    fetchRecipes() {
        return this.http.get<Recipe[]>('https://shopping-app-794be-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(responseData => {
            return responseData.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients? recipe.ingredients : [] }
            })
        }), tap(recipes => {
            this.recipeService.setRecipes(recipes)
        })
        )
    }
}