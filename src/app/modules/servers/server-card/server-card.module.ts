import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerCardComponent } from './server-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ServerCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [ServerCardComponent],
})
export class ServerCardModule {}
