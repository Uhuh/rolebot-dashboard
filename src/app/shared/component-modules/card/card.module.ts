import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardRowModule } from './card-row/card-row.module';
import { CardRowComponent } from './card-row/card-row.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, CardRowModule, CdkAccordionModule],
  exports: [CardComponent, CardRowComponent],
})
export class CardModule {}
