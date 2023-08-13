import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'this is simply a test', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg' ),
    new Recipe('Another test recipe', 'another test test', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg' )
  ];

  constructor() {

  }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
