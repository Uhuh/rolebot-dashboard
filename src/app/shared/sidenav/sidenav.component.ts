import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, first } from 'rxjs';
import { JwtService } from '../services/jwtHandler.service';
import { IGuild } from '../types/interfaces';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  isFresh?: boolean = false;
  guilds: IGuild[] = [];
  selectedGuild?: IGuild;
  discordIconUrl = 'https://cdn.discordapp.com/icons';

  constructor(
    private readonly jwtHandler: JwtService,
    private readonly route: Router
  ) {
    combineLatest([
      this.jwtHandler.isFresh$,
      this.jwtHandler.guilds$,
      this.route.events,
    ]).subscribe(([isFresh, guilds, event]) => {
      if (!guilds) return;

      this.isFresh = isFresh;
      this.guilds = guilds;

      if (event instanceof NavigationEnd) {
        this.selectedGuild = this.guilds.find((g) =>
          this.route.url.toString().includes(g.id)
        );
      }
    });
  }

  get guildIcon() {
    return `${this.discordIconUrl}/${this.selectedGuild?.id}/${this.selectedGuild?.icon}.webp`;
  }

  setSelected(guild: IGuild) {
    this.selectedGuild = guild;
  }
}
