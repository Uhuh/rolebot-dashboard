import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServersComponent } from './servers.component';
import { RouterModule } from '@angular/router';
import { ServerCardModule } from './server-card/server-card.module';
import { ApiService } from 'src/app/shared/services/api.service';

@NgModule({
  declarations: [ServersComponent],
  imports: [
    CommonModule,
    RouterModule,
    ServerCardModule,
    RouterModule.forChild([{ path: '', component: ServersComponent }]),
  ],
  providers: [ApiService],
  exports: [ServersComponent],
})
export class ServersModule {}
