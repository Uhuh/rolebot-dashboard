import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServersComponent } from './servers.component';
import { RouterModule } from '@angular/router';
import { ServerCardModule } from './server-card/server-card.module';
import { GuildService } from '../server/server.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ServersComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    ServerCardModule,
    MatProgressBarModule,
    RouterModule.forChild([
      {
        path: '',
        component: ServersComponent,
        title: 'RoleBot - Servers list',
      },
    ]),
  ],
  providers: [ApiService, GuildService],
  exports: [ServersComponent],
})
export class ServersModule {}
