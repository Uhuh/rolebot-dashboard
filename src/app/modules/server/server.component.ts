import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { JwtService } from 'src/app/shared/services/jwtHandler.service';
import { IGuild } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent implements OnInit {
  guild?: IGuild;

  constructor(
    private readonly jwtHandler: JwtService,
    private readonly route: ActivatedRoute
  ) {
    combineLatest([this.route.params, this.jwtHandler.guilds$]).subscribe(
      ([params, guilds]) => {
        if (!guilds) return;

        const guildId = params['guildId'];

        this.guild = guilds.find((g) => g.id === guildId);
      }
    );
  }

  ngOnInit(): void {}
}
