import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject, switchMap, takeUntil } from 'rxjs';
import { JwtService } from '../../services/jwtHandler.service';
import { IGuild } from '../../types/interfaces';

export interface SideNavLink {
  name: string;
  url: string;
  click?: () => unknown;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnDestroy {
  private readonly destroyed = new Subject<void>();
  discordIconUrl = 'https://cdn.discordapp.com/icons';
  loginUrl =
    'https://discord.com/api/oauth2/authorize?client_id=741682757486510081&redirect_uri=https%3A%2F%2Fdashboard.rolebot.gg%2Fservers&response_type=code&scope=identify%20guilds';

  links: SideNavLink[] = [
    {
      name: 'Config',
      url: '/dashboard/config',
    },
    {
      name: 'Category',
      url: '/dashboard/category',
    },
    {
      name: 'Role',
      url: '/dashboard/role',
    },
  ];

  isFresh?: boolean = false;
  guilds: IGuild[] = [];
  selectedGuild?: IGuild;
  guildId?: string;

  constructor(
    private readonly jwtHandler: JwtService,
    private readonly route: ActivatedRoute
  ) {
    this.route.queryParams
      .pipe(
        takeUntil(this.destroyed),
        switchMap((params) => {
          this.guildId = params['guildId'];

          return combineLatest([
            this.jwtHandler.isFresh$,
            this.jwtHandler.guilds$,
          ]);
        })
      )
      .subscribe(([isFresh, guilds]) => {
        this.isFresh = isFresh;
        this.guilds = guilds ?? [];

        this.selectedGuild = this.guilds.find((g) => g.id === this.guildId);
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  get guildIcon() {
    return `${this.discordIconUrl}/${this.selectedGuild?.id}/${this.selectedGuild?.icon}.webp`;
  }

  setSelected(guild: IGuild) {
    this.selectedGuild = guild;
  }

  removeSelected() {
    this.selectedGuild = undefined;
  }
}
