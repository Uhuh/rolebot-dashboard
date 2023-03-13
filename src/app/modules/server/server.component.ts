import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { JwtService } from 'src/app/shared/services/jwtHandler.service';
import { IGuild } from 'src/app/shared/types/interfaces';
import {
  updateCategories,
  updateConfig,
  updateGuildEmojis,
  updateGuildId,
  updateGuildRoles,
  updateReactRoles,
} from './state/server.actions';
import { GuildState } from './state/server.model';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent implements OnInit, OnDestroy {
  private readonly destroyed = new Subject<void>();
  guild?: IGuild;

  constructor(
    private readonly jwtHandler: JwtService,
    private readonly store: Store<GuildState>,
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    combineLatest([this.route.queryParams, this.jwtHandler.guilds$]).subscribe(
      ([params, guilds]) => {
        const guildId = params['guildId'];
        this.guild = guilds?.find((g) => g.id === guildId);

        if (!this.guild) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  ngOnInit() {
    if (!this.guild?.id) return console.error('Guild not defined.');

    this.store.dispatch(updateGuildId({ guildId: this.guild.id }));

    this.apiService
      .getGuildConfig(this.guild?.id)
      .pipe(takeUntil(this.destroyed))
      .subscribe((config) => this.store.dispatch(updateConfig({ config })));

    this.apiService
      .getGuildCategories(this.guild?.id)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (categories) =>
          this.store.dispatch(updateCategories({ categories })),
        error: () => this.store.dispatch(updateCategories({ categories: [] })),
      });

    this.apiService
      .getGuildReactRoles(this.guild?.id)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (reactRoles) =>
          this.store.dispatch(updateReactRoles({ reactRoles })),
        error: () => this.store.dispatch(updateReactRoles({ reactRoles: [] })),
      });

    this.apiService
      .getGuildInfo(this.guild?.id)
      .pipe(takeUntil(this.destroyed))
      .subscribe((guildInfo) => {
        this.store.dispatch(updateGuildRoles({ guildRoles: guildInfo.roles }));
        this.store.dispatch(
          updateGuildEmojis({ guildEmojis: guildInfo.emojis })
        );
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }
}
