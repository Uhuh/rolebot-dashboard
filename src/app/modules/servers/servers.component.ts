import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { JwtService } from 'src/app/shared/services/jwtHandler.service';
import { IGuild } from 'src/app/shared/types/interfaces';
import { LoadState } from '../server/state/loading-state';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
})
export class ServersComponent implements OnDestroy {
  readonly LoadState = LoadState;
  private readonly destroyed = new Subject<void>();
  isFresh = false;
  guilds: IGuild[] = [];

  loadState: LoadState = LoadState.Loading;
  errorMessage = '';

  constructor(
    private readonly jwtService: JwtService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly apiService: ApiService
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed))
      .subscribe(async (params) => {
        // if the code param is invalid then the jwt is probably already set.
        if (!params['code']) return;

        this.apiService
          .authorizeUser(params['code'])
          .pipe(takeUntil(this.destroyed))
          .subscribe({
            next: () => {
              this.jwtService.updateJwtToken();
              this.router.navigate(['/servers']);
            },
            error: (e) => {
              this.loadState = LoadState.Error;
              this.errorMessage = e.message;
            },
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
  }
}
