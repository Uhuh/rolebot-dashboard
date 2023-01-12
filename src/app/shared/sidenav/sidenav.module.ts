import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { ServerModule } from './server/server.module';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, ServerModule, RouterModule, UserModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}
