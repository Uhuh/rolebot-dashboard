import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DisplayType, ICategory } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent {
  readonly defaultCategory: ICategory = {
    displayOrder: DisplayType.alpha,
    excludedRoleId: '',
    guildId: '',
    name: '',
    requiredRoleId: '',
    description: '',
    mutuallyExclusive: false,
    id: -1337,
  };

  constructor(
    private readonly dialogRef: MatDialogRef<CategoryCreateComponent>
  ) {}

  createCategory(category: ICategory) {
    this.dialogRef.close(category);
  }
}
