import { Component, Input } from '@angular/core';
import { IGuild } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.scss'],
})
export class ServerCardComponent {
  @Input() guild!: IGuild;
  discordIconUrl = 'https://cdn.discordapp.com/icons';
  defaultIcon = 'https://cdn.discordapp.com/embed/avatars/0.png';

  constructor() {}

  get iconUrl() {
    return this.guild.icon
      ? `${this.discordIconUrl}/${this.guild?.id}/${this.guild?.icon}.webp`
      : this.defaultIcon;
  }
}
