import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeInfoDialogComponent } from './recipe-info-dialog.component';

describe('RecipeInfoDialogComponent', () => {
  let component: RecipeInfoDialogComponent;
  let fixture: ComponentFixture<RecipeInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
