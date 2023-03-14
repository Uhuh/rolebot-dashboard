import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactRoleCreateComponent } from './react-role-create.component';
import { CardModule } from 'src/app/shared/component-modules/card/card.module';
import { CardRowModule } from 'src/app/shared/component-modules/card/card-row/card-row.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [ReactRoleCreateComponent],
  imports: [
    CommonModule,
    CardModule,
    CardRowModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [ReactRoleCreateComponent],
})
export class ReactRoleCreateModule {}
