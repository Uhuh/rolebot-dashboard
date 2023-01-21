import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DisplayType, ICategory } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnChanges {
  @Input() category!: ICategory;

  categoryGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.categoryGroup = this.fb.group<Omit<ICategory, 'id' | 'guildId'>>({
      name: '',
      description: '',
      displayOrder: DisplayType.alpha,
      excludedRoleId: '',
      mutuallyExclusive: false,
      requiredRoleId: '',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { category } = changes;
    if (category) {
      const value = category.currentValue as ICategory;

      this.categoryGroup = new FormGroup({
        name: new FormControl(value.name),
        description: new FormControl(value.description),
        displayOrder: new FormControl(value.displayOrder),
        excludedRoleId: new FormControl(value.excludedRoleId),
        mutuallyExclusive: new FormControl(value.mutuallyExclusive),
        requiredRoleId: new FormControl(value.requiredRoleId),
      });
    }
  }
}
