import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
