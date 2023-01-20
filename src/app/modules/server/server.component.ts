import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { JwtService } from 'src/app/shared/services/jwtHandler.service';
import { ICategory, IGuild } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent implements OnInit {
  guild?: IGuild;
  categories: ICategory[] = [];

  constructor(
    private readonly jwtHandler: JwtService,
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

  ngOnInit(): void {}
}
