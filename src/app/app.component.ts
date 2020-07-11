import { Component } from '@angular/core';
import { ChooseIngredient } from './ingredients/choose-ingredient/choose-ingredient.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sous-chef';
  selectedIngredients: ChooseIngredient[] = new Array();

  onSearched(selectedIngredients: ChooseIngredient[]) {
    this.selectedIngredients = [...selectedIngredients];
  }
}
