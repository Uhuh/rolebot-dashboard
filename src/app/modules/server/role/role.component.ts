import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import {
  ICategory,
  IGuildEmoji,
  IGuildRole,
  IReactRole,
} from 'src/app/shared/types/interfaces';
import { GuildService } from '../server.service';
import { ReactRoleCreateComponent } from './react-role-create/react-role-create.component';

export interface Category {
  name: string;
  id: number;
  reactRoles: IReactRole[];
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnDestroy {
  private readonly destroyed = new Subject<void>();

  categories: ICategory[] = [];
  reactRoles: IReactRole[] = [];
  guildId?: string;
  guildRoles: IGuildRole[] = [];
  guildEmojis: IGuildEmoji[] = [];

  data: Category[] = [];

  constructor(
    private readonly guildService: GuildService,
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar
  ) {
    combineLatest([
      this.guildService.categories$,
      this.guildService.reactRoles$,
    ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(([categories, reactRoles]) => {
        this.categories = categories;
        this.reactRoles = reactRoles;

        this.data = this.categories.map<Category>((c) => ({
          name: c.name,
          id: c.id,
          reactRoles: this.reactRoles.filter((r) => r.categoryId === c.id),
        }));

        // For display purposes, insert all unused react roles in this fake category.
        this.data.unshift({
          id: -1,
          name: 'React Roles without a category',
          reactRoles: this.reactRoles.filter((r) => !r.categoryId),
        });
      });

    combineLatest([
      this.guildService.guildRoles$,
      this.guildService.guildEmojis$,
    ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(([roles, emojis]) => {
        this.guildRoles = roles;
        this.guildEmojis = emojis;
      });

    this.guildService.guildId$
      .pipe(takeUntil(this.destroyed))
      .subscribe((guildId) => (this.guildId = guildId));
  }

  createReactRole() {
    const dialogRef = this.dialog.open(ReactRoleCreateComponent, {
      minWidth: '350px',
      maxWidth: '800px',
      data: {
        categories: this.categories,
        roles: this.guildRoles,
        emojis: this.guildEmojis,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroyed))
      .subscribe((newReactRole) => {
        if (!newReactRole) return;

        const { emoji, role, category, description } = newReactRole;
        const guildRole = this.guildRoles.find((r) => r.id === role.id);

        if (!guildRole) {
          return this.snackbar.open('Cannot find role.', 'Dismiss', {
            politeness: 'assertive',
            panelClass: 'app-notification-error',
          });
        }

        if (!this.guildId) {
          return this.snackbar.open('Failed to load server ID.', 'Dismiss', {
            politeness: 'assertive',
            panelClass: 'app-notification-error',
          });
        }

        const reactRole: IReactRole = {
          // ID doesn't matter since it's generated later.
          id: -1,
          name: role.name,
          description: description,
          emojiId: typeof emoji === 'string' ? emoji : emoji.id,
          emojiTag:
            typeof emoji === 'string'
              ? null
              : `<${emoji.animated ? 'a' : ''}:nn:${emoji.id}>`,
          categoryAddDate: new Date(),
          roleId: role.id,
          guildId: this.guildId,
          categoryId: category.id,
        };

        return this.guildService.createReactRole(this.guildId, reactRole);
      });
  }

  drop(event: CdkDragDrop<IReactRole[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }
}
