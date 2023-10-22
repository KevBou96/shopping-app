
import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list-action"

const initState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ]
};

export function shoppingListReducer(state = initState, action: ShoppingListActions.AddIngredient) {
    if (action.type === ShoppingListActions.ADD_INGREDIENT) {
        return {
            ...state,
            ingredients: [...state.ingredients, action.payload]        
        }  
    }
    else {
        return state
    }
}