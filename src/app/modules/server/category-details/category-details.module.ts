import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryDetailsComponent } from './category-details.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CategoryDetailsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoryDetailsComponent,
      },
    ]),
  ],
  exports: [CategoryDetailsComponent],
})
export class CategoryDetailsModule {}
