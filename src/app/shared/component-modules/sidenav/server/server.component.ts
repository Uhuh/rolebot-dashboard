import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGuild } from '../../types/interfaces';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent {
  @Input() guild!: IGuild;
  @Output() selectedGuild = new EventEmitter<IGuild>();

  discordIconUrl = 'https://cdn.discordapp.com/icons';

  constructor() {}

  ngOnInit(): void {}

  get guildIcon() {
    return `${this.discordIconUrl}/${this.guild?.id}/${this.guild?.icon}.webp`;
  }

  onSelect() {
    this.selectedGuild.emit(this.guild);
  }
}
