import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [InfoComponent],
  imports: [CommonModule, RouterModule],
  exports: [InfoComponent],
})
export class InfoModule {}
