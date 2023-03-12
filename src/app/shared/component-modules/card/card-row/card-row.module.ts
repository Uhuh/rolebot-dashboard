import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRowComponent } from './card-row.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CardRowComponent],
  imports: [CommonModule, CdkAccordionModule, MatIconModule],
  exports: [CardRowComponent],
})
export class CardRowModule {}
