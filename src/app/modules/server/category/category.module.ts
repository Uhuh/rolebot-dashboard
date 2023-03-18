import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'src/app/shared/component-modules/card/card.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { CardRowModule } from 'src/app/shared/component-modules/card/card-row/card-row.module';
import { CategoryFormModule } from './category-form/category-form.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryCreateModule } from './category-create/category-create.module';
import { GuildService } from '../server.service';
import { ConfirmModalModule } from 'src/app/shared/component-modules/confirm-modal/confirm-modal.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CdkAccordionModule,
    MatIconModule,
    CardModule,
    CardRowModule,
    CategoryFormModule,
    CategoryCreateModule,
    ConfirmModalModule,
    CommonModule,
    MatProgressSpinnerModule,
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
