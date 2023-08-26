import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(0, 'A test recipe', 
        'this is simply a test',
        'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
        [new Ingredient('meat', 1),
         new Ingredient('fries', 20)]),
        new Recipe(1, 'Another test recipe', 'another test test', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
        [new Ingredient('buns',2),
         new Ingredient('meat', 1)])
      ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}