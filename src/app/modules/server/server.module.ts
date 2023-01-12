import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerComponent } from './server.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ServerComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild([{ path: '', component: ServerComponent }]),
  ],
  exports: [ServerComponent],
})
export class ServerModule {}