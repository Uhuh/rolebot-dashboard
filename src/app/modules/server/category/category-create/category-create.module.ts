import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCreateComponent } from './category-create.component';
import { CategoryFormModule } from '../category-form/category-form.module';
import { CardModule } from 'src/app/shared/card/card.module';
import { CardRowModule } from 'src/app/shared/card/card-row/card-row.module';
import { MatDialogContent } from '@angular/material/dialog';

@NgModule({
  declarations: [CategoryCreateComponent],
  imports: [CommonModule, CardModule, CardRowModule, CategoryFormModule],
  exports: [CategoryCreateComponent],
})
export class CategoryCreateModule {}
