import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'src/app/shared/card/card.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { CardRowModule } from 'src/app/shared/card/card-row/card-row.module';
import { CategoryFormModule } from './category-form/category-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryCreateModule } from './category-create/category-create.module';
import { GuildService } from '../server.service';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CdkAccordionModule,
    MatIconModule,
    CardModule,
    CardRowModule,
    CategoryFormModule,
    CategoryCreateModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoryComponent,
      },
    ]),
  ],
  providers: [GuildService],
})
export class CategoryModule {}
