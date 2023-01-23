import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { CardModule } from 'src/app/shared/card/card.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DiscordModule } from 'src/app/shared/discord/discord.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    CardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    DiscordModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConfigComponent,
      },
    ]),
  ],
  exports: [ConfigComponent],
})
export class ConfigModule {}
