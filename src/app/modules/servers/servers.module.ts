import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServersComponent } from './servers.component';
import { RouterModule } from '@angular/router';
import { ServerCardModule } from './server-card/server-card.module';

@NgModule({
  declarations: [ServersComponent],
  imports: [
    CommonModule,
    RouterModule,
    ServerCardModule,
    RouterModule.forChild([{ path: '', component: ServersComponent }]),
  ],
  exports: [ServersComponent],
})
export class ServersModule {}
