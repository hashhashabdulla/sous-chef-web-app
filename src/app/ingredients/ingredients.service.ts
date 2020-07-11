import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChooseIngredient } from './choose-ingredient/choose-ingredient.model';
import { Constant } from '../constant.model';

@Injectable({ providedIn: 'root' })
export class IngredientsService {
  apiUrl = 'https://api.spoonacular.com/food/ingredients/autocomplete';

  constructor(private http: HttpClient) {}

  getAutocompleteIngredients(autocompleteText: string) {
    return this.http.get<ChooseIngredient[]>(
      `${this.apiUrl}?apiKey=${Constant.apiKey}&query=${autocompleteText}&number=5&metaInformation=false`
    );
  }
}
