import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
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

  constructor(
    private readonly jwtHandler: JwtService,
    private readonly route: ActivatedRoute
  ) {
    combineLatest([
      this.jwtHandler.isFresh$,
      this.jwtHandler.guilds$,
      this.route.queryParams,
    ]).subscribe(([isFresh, guilds, params]) => {
      if (!guilds) return;

      this.isFresh = isFresh;
      this.guilds = guilds;
      const guildId = params['guildId'];

      if (guildId) {
        this.selectedGuild = this.guilds.find((g) => g.id === guildId);
      }
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
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
