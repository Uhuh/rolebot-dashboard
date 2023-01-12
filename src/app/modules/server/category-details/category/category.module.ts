import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
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
