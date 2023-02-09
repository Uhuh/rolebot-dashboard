import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerComponent } from './server.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'src/app/shared/component-modules/card/card.module';
import { ApiService } from 'src/app/shared/services/api.service';

@NgModule({
  declarations: [ServerComponent],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    RouterModule.forChild([
      {
        path: '',
        component: ServerComponent,
        children: [
          {
            path: 'config',
            loadChildren: () =>
              import('./config/config.module').then((m) => m.ConfigModule),
          },
          {
            path: 'category',
            loadChildren: () =>
              import('./category/category.module').then(
                (m) => m.CategoryModule
              ),
          },
          {
            path: 'role',
            loadChildren: () =>
              import('./role/role.module').then((m) => m.RoleModule),
          },
        ],
      },
    ]),
  ],
  providers: [ApiService],
  exports: [ServerComponent],
})
export class ServerModule {}
