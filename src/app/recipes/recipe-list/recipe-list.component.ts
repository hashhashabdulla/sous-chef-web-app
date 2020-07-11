import { Component, OnInit, Input, Inject } from '@angular/core';
import { ChooseIngredient } from 'src/app/ingredients/choose-ingredient/choose-ingredient.model';
import { RecipesService } from './recipes.service';
import { RecipeList } from './recipe-list.model';
import { Recipe } from '../recipe.model';
import { MatDialog } from '@angular/material/dialog';
import { RecipeInfoDialogComponent } from '../recipe-info-dialog/recipe-info-dialog.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipeList: RecipeList[] = new Array();
  recipeInfoList: Recipe[] = new Array();
  private _selectedIngredients: ChooseIngredient[] = new Array();

  @Input()
  set selectedIngredients(value: ChooseIngredient[]) {
    this._selectedIngredients = value;
    this.fetchRecipes();
  }
  get selectedIngredients(): ChooseIngredient[] {
    return this._selectedIngredients;
  }

  constructor(
    public recipesService: RecipesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // //TODO Remove this line of code.
    // const recipe: RecipeList = {
    //   id: 1,
    //   title: 'Lorem Ipsum',
    //   image: 'https://picsum.photos/200',
    //   imageType: 'jpg',
    //   usedIngredientCount: 0,
    //   missedIngredientCount: 0,
    //   missedIngredients: [],
    //   usedIngredients: [],
    //   unusedIngredients: [],
    //   likes: 3,
    // };
    // const recipeInfo: Recipe = {
    //   id: 1,
    //   title: 'Lorem Ipsum',
    //   readyInMinutes: 15,
    //   servings: 5,
    //   sourceUrl: 'https://google.com',
    //   image: 'https://picsum.photos/200',
    //   imageType: 'jpg',
    //   summary:
    //     'Fugiat et quis duis ex sit magna exercitation cillum nulla commodo culpa. Aute consectetur dolore elit laboris occaecat voluptate occaecat sunt aute. Excepteur irure tempor anim laboris dolor nisi consectetur tempor reprehenderit. Exercitation occaecat ut et velit non officia qui nostrud sint amet excepteur non. Dolor ipsum proident eiusmod velit nisi laboris esse dolore magna quis deserunt.',
    //   instructions:
    //     'Laborum excepteur consequat in pariatur officia amet Lorem in in commodo pariatur. Ullamco deserunt et veniam tempor. Ad Lorem et magna cillum mollit amet elit tempor aliqua adipisicing aliquip.',
    //   creditsText: 'John Doe',
    //   sourceName: 'John Doe',
    // };
    // for (let i = 0; i < 1; i++) {
    //   this.recipeList.push(recipe);
    // }
    // for (let i = 0; i < 1; i++) {
    //   this.recipeInfoList.push(recipeInfo);
    // }
  }

  fetchRecipes(): void {
    const ingredients = this.selectedIngredients.map((o) => o.name);

    this.recipesService
      .getRecipeListByIngredients(ingredients, 5)
      .subscribe((recipeList) => {
        this.recipeInfoList.splice(0, this.recipeInfoList.length);
        this.recipeList = [
          ...recipeList.filter(
            (o) => o.missedIngredientCount <= 2 && o.usedIngredientCount > 0
          ),
        ];

        this.recipeList.forEach((element) => {
          this.recipesService
            .getRecipeInfo(element.id)
            .subscribe((recipeInfo) => {
              this.recipeInfoList.push(recipeInfo);
              console.log(this.recipeInfoList);
            });
        });
      });
  }

  openDialog(recipeInfo: Recipe): void {
    this.dialog.open(RecipeInfoDialogComponent, {
      data: {
        title: recipeInfo.title,
        summary: recipeInfo.summary,
        instructions: recipeInfo.instructions,
        sourceUrl: recipeInfo.sourceUrl,
        sourceName: recipeInfo.sourceName,
      },
    });
  }
}
