import { Action } from "@angular/fire/compat/firestore";
import { Ingredient } from "src/app/shared/ingredient.model";


export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action<Ingredient> {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) {}
}