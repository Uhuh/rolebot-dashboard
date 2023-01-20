import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { JwtService } from 'src/app/shared/services/jwtHandler.service';
import { IGuild } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
})
export class ServersComponent implements OnDestroy {
  private readonly destroyed$ = new Subject<void>();
  isFresh = false;
  guilds: IGuild[] = [];

  constructor(
    private readonly jwtService: JwtService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly apiService: ApiService
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe(async (params) => {
        // if the code param is invalid then the jwt is probably already set.
        if (!params['code']) return;

        this.apiService
          .authorizeUser(params['code'])
          .pipe(takeUntil(this.destroyed$))
          .subscribe(() => {
            this.jwtService.updateJwtToken();
            this.router.navigate(['/servers']);
          });
      });

    combineLatest([this.jwtService.guilds$, this.jwtService.isFresh$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([guilds, isFresh]) => {
        this.guilds = guilds ?? [];
        this.isFresh = !!isFresh;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
