import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseIngredientComponent } from './choose-ingredient.component';

describe('ChooseIngredientComponent', () => {
  let component: ChooseIngredientComponent;
  let fixture: ComponentFixture<ChooseIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseIngredientComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
