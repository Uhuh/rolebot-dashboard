import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { GuildService } from '../server.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { CardModule } from 'src/app/shared/component-modules/card/card.module';
import { CardRowModule } from 'src/app/shared/component-modules/card/card-row/card-row.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactRoleModule } from './react-role/react-role.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactRoleCreateModule } from './react-role-create/react-role-create.module';

@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    DragDropModule,
    CdkAccordionModule,
    CardModule,
    CardRowModule,
    MatDialogModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    ReactRoleModule,
    ReactRoleCreateModule,
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
