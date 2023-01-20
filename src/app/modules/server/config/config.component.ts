import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { GuildReactType, IGuildConfig } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnDestroy {
  private readonly destroyed$ = new Subject<void>();
  config?: IGuildConfig;
  configType: GuildReactType = GuildReactType.reaction;
  hideEmojis?: boolean;

  types: { label: string; value: GuildReactType }[] = [
    { label: 'Reaction', value: 0 },
    { label: 'Button', value: 1 },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params) => {
        const guildId = params['guildId'];

        if (!guildId) return;

        this.apiService
          .getGuildConfig(guildId)
          .pipe(takeUntil(this.destroyed$))
          .subscribe((config) => {
            console.table(config);
            this.config = config;
            this.configType = config.reactType;
            this.hideEmojis = config.hideEmojis;
          });
      });
  }

  get disableHideEmojis() {
    return this.configType !== GuildReactType.button;
  }

  get isReaction() {
    return this.configType === GuildReactType.reaction;
  }

  get isButton() {
    return this.configType === GuildReactType.button;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
