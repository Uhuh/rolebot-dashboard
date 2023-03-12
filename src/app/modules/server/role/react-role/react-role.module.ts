import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactRoleComponent } from './react-role.component';
import { EmojiPipe } from 'src/app/shared/pipes/emoji.pipe';

@NgModule({
  declarations: [ReactRoleComponent, EmojiPipe],
  imports: [CommonModule],
  exports: [ReactRoleComponent],
})
export class ReactRoleModule {}
