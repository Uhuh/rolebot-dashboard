import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { JwtService } from 'src/app/shared/services/jwtHandler.service';
import { IGuild } from 'src/app/shared/types/interfaces';
import { GuildService } from '../server/server.service';
import { LoadState } from '../server/state/loading-state';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
})
export class ServersComponent implements OnDestroy {
  private readonly destroyed = new Subject<void>();
  readonly LoadState = LoadState;
  isFresh = false;
  guilds: IGuild[] = [];

  loadState: LoadState = LoadState.Loading;

  constructor(
    private readonly jwtService: JwtService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly guildService: GuildService
  ) {
    this.guildService.authState$
      .pipe(takeUntil(this.destroyed))
      .subscribe((authState) => (this.loadState = authState));

    this.route.queryParams
      .pipe(takeUntil(this.destroyed))
      .subscribe(async (params) => {
        // if the code param is invalid then the jwt is probably already set.
        if (!params['code']) return;

        this.guildService.authorizeUser(params['code']).add(() => {
          this.jwtService.updateJwtToken();
          this.router.navigate(['/servers']);
        });
      });

    combineLatest([this.jwtService.guilds$, this.jwtService.isFresh$])
      .pipe(takeUntil(this.destroyed))
      .subscribe(([guilds, isFresh]) => {
        this.loadState = LoadState.Complete;
        this.guilds = guilds ?? [];
        this.isFresh = !!isFresh;
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
