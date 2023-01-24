import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private readonly dialogRef: MatDialogRef<CategoryCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { guildId: string }
  ) {
    this.defaultCategory.guildId = data.guildId;
  }

  createCategory(category: ICategory) {
    console.log(category);
    //this.dialogRef.close();
  }
}
