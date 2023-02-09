import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCreateComponent } from './category-create.component';
import { CategoryFormModule } from '../category-form/category-form.module';
import { CardModule } from 'src/app/shared/component-modules/card/card.module';
import { CardRowModule } from 'src/app/shared/component-modules/card/card-row/card-row.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [CategoryCreateComponent],
  imports: [
    CommonModule,
    CardModule,
    CardRowModule,
    MatDialogModule,
    CategoryFormModule,
  ],
  exports: [CategoryCreateComponent],
})
export class CategoryCreateModule {}
