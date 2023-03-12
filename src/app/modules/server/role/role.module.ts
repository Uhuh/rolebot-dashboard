import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { GuildService } from '../server.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { EmojiPipe } from 'src/app/shared/pipes/emoji.pipe';
import { CardModule } from 'src/app/shared/component-modules/card/card.module';
import { CardRowModule } from 'src/app/shared/component-modules/card/card-row/card-row.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ReactRoleModule } from './react-role/react-role.module';

@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    CdkAccordionModule,
    CardModule,
    CardRowModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    ReactRoleModule,
    RouterModule.forChild([
      {
        path: '',
        component: RoleComponent,
      },
    ]),
  ],
  exports: [RoleComponent],
  providers: [GuildService],
})
export class RoleModule {}
