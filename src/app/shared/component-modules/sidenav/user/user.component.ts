import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { JwtService } from 'src/app/shared/services/jwtHandler.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  username?: string;
  userId?: string;
  avatarId?: string;
  constructor(private readonly jwtHandler: JwtService) {
    combineLatest([
      this.jwtHandler.username$,
      this.jwtHandler.avatar$,
      this.jwtHandler.userId$,
    ]).subscribe(([username, avatarId, userId]) => {
      this.username = username;
      this.userId = userId;
      this.avatarId = avatarId;
    });
  }

  get avatar() {
    return `https://images.discordapp.net/avatars/${this.userId}/${this.avatarId}`;
  }

  logout() {
    this.jwtHandler.logout();
  }
}
