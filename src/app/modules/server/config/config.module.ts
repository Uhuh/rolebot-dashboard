import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { CardModule } from 'src/app/shared/component-modules/card/card.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GuildService } from '../server.service';
import { DiscordModule } from 'src/app/shared/component-modules/discord/discord.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    CardModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    DiscordModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConfigComponent,
      },
    ]),
  ],
  providers: [GuildService],
})
export class ConfigModule {}
