import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'servers',
    pathMatch: 'full',
  },
  {
    path: 'servers',
    loadChildren: () =>
      import('./modules/servers/servers.module').then((m) => m.ServersModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/server/server.module').then((m) => m.ServerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
