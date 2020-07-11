import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-info-dialog',
  templateUrl: './recipe-info-dialog.component.html',
  styleUrls: ['./recipe-info-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipeInfoDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
