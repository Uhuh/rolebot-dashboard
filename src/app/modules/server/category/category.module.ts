import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'src/app/shared/card/card.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { CardRowModule } from 'src/app/shared/card/card-row/card-row.module';
import { CategoryFormModule } from './category-form/category-form.module';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CdkAccordionModule,
    MatIconModule,
    CardModule,
    CardRowModule,
    CategoryFormModule,
    CommonModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoryComponent,
      },
    ]),
  ],
  exports: [CategoryComponent],
})
export class CategoryModule {}
