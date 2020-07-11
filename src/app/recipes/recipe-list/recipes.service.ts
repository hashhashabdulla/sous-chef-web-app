import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeList } from './recipe-list.model';
import { Constant } from 'src/app/constant.model';
import { Recipe } from '../recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  apiUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) {}

  getRecipeListByIngredients(ingredients: string[], number: number) {
    const ingredientsStr = ingredients.join(',+');
    return this.http.get<RecipeList[]>(
      `${this.apiUrl}/findByIngredients?apiKey=${Constant.apiKey}&ingredients=${ingredientsStr}&number=${number}`
    );
  }

  getRecipeInfo(recipeId: number) {
    return this.http.get<Recipe>(
      `${this.apiUrl}/${recipeId}/information?apiKey=${Constant.apiKey}&includeNutrition=false`
    );
  }
}
