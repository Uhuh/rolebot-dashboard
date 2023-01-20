import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { InfoModule } from './info/info.module';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, InfoModule, RouterModule, UserModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}
