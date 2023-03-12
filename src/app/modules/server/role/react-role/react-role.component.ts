import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IReactRole } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-react-role',
  templateUrl: './react-role.component.html',
  styleUrls: ['./react-role.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReactRoleComponent {
  @Input() reactRole!: IReactRole;

  constructor() {}

  discordEmoji(id: string) {
    return `https://cdn.discordapp.com/emojis/${id}.webp?size=56&quality=lossless`;
  }
}
