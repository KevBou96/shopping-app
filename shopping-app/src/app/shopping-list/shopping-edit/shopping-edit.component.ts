import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  shoppingListForm: FormGroup;
  editMode = false;
  editedItemIndex: number = null;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}
  
  ngOnInit(): void {
    this.shoppingListForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
    });
    this.subscription = this.slService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.retrieveIngredient(index);
      this.shoppingListForm.setValue({
        'name': this.editedItem.name,
        'amount': this.editedItem.amount
      })
      console.log(index, this.editedItem)
    })
  }

  onAddItem() {
    const ingName = this.shoppingListForm.get('name').value;
    const ingAmount = +this.shoppingListForm.get('amount').value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.slService.editIngredient(this.editedItemIndex, newIngredient);
      console.log('editmode')
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.shoppingListForm.reset() 
  }
 
  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear()
    this.slService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
