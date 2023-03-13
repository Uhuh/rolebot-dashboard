import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactRoleCreateComponent } from './react-role-create.component';
import { CardModule } from 'src/app/shared/component-modules/card/card.module';
import { CardRowModule } from 'src/app/shared/component-modules/card/card-row/card-row.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ReactRoleCreateComponent],
  imports: [CommonModule, CardModule, CardRowModule, MatSelectModule],
  exports: [ReactRoleCreateComponent],
})
export class ReactRoleCreateModule {}
