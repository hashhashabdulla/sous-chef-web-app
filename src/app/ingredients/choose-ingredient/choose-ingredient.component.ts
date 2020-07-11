import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngredientsService } from '../ingredients.service';
import { ChooseIngredient } from './choose-ingredient.model';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-choose-ingredient',
  templateUrl: './choose-ingredient.component.html',
  styleUrls: ['./choose-ingredient.component.css'],
})
export class ChooseIngredientComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  form: FormGroup;
  selectedIngredients: ChooseIngredient[] = new Array();
  filteredIngredients: ChooseIngredient[] = new Array();
  @Output() searched = new EventEmitter<ChooseIngredient[]>();

  @ViewChild('ingredientInput') ingredientInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(public ingredientsService: IngredientsService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      chooseIngredientText: new FormControl(),
    });

    this.form
      .get('chooseIngredientText')
      .valueChanges.subscribe((autocompleteText) => {
        this._filter(autocompleteText);
      });
  }

  _filter(autocompleteText: string) {
    //Call the GET api via the ingredientsService to get the filtered list of ingredients
    this.ingredientsService
      .getAutocompleteIngredients(autocompleteText)
      .subscribe((ingredientsData) => {
        //Update the filteredIngredients List
        this.filteredIngredients = ingredientsData;
      });
  }

  displayIngredientName(ingredient: ChooseIngredient) {
    return ingredient ? ingredient.name : undefined;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (this.filteredIngredients.length > 0) {
      const chosenIngredient: ChooseIngredient = this.filteredIngredients.find(
        (o) => o.name.trim() === value
      );

      // Add our ingredient
      if ((value || '').trim()) {
        this.selectedIngredients.push(chosenIngredient);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.form.get('chooseIngredientText').setValue(null);
    }
  }

  remove(ingredient: ChooseIngredient): void {
    const index = this.selectedIngredients.indexOf(ingredient);

    if (index >= 0) {
      this.selectedIngredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedIngredients.push(event.option.value);
    this.ingredientInput.nativeElement.value = '';
    this.form.get('chooseIngredientText').setValue(null);
  }

  onSeachClick(event): void {
    this.searched.emit(this.selectedIngredients);
  }
}
