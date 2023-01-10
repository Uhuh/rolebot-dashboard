import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/servers/servers.module').then((m) => m.ServersModule),
  },
  {
    path: 'dashboard/:guildId',
    loadChildren: () =>
      import('./modules/server/server.module').then((m) => m.ServerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
