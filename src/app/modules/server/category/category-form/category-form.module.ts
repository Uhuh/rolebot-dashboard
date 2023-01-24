import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [CategoryFormComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports: [CategoryFormComponent],
})
export class CategoryFormModule {}
