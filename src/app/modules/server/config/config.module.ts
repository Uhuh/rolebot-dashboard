import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { CardModule } from 'src/app/shared/card/card.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DiscordModule } from 'src/app/shared/discord/discord.module';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    CardModule,
    MatRadioModule,
    MatCheckboxModule,
    DiscordModule,
    FormsModule,
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
