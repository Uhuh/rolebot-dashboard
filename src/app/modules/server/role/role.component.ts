import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ICategory, IReactRole } from 'src/app/shared/types/interfaces';
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

  data: Category[] = [];

  constructor(
    private readonly guildService: GuildService,
    private readonly dialog: MatDialog
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

        this.data.unshift({
          id: -1,
          name: 'React Roles without a category',
          reactRoles: this.reactRoles.filter((r) => !r.categoryId),
        });
      });
  }

  createReactRole() {
    const dialogRef = this.dialog.open(ReactRoleCreateComponent, {
      minWidth: '350px',
      maxWidth: '500px',
      data: {
        categories: this.categories,
        roles: [],
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroyed))
      .subscribe((newReactRole) => {});
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }
}
