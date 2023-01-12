import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dashboard/:guildId',
    loadChildren: () =>
      import('./modules/server/server.module').then((m) => m.ServerModule),
  },
  {
    path: 'dashboard/:guildId/category',
    loadChildren: () =>
      import('./modules/server/category-details/category-details.module').then(
        (m) => m.CategoryDetailsModule
      ),
  },
  {
    path: 'dashboard/:guildId/category/:categoryId',
    loadChildren: () =>
      import('./modules/server/category-details/category/category.module').then(
        (m) => m.CategoryModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
