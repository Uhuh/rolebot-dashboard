import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { ServerModule } from './server/server.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, ServerModule, UserModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}
