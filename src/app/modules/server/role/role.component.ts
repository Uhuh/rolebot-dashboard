import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ICategory, IReactRole } from 'src/app/shared/types/interfaces';
import { GuildService } from '../server.service';

export interface Category {
  name: string;
  id: number;
  reactRoles: IReactRole[];
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RoleComponent implements OnDestroy {
  private readonly destroyed = new Subject<void>();

  categories: ICategory[] = [];
  reactRoles: IReactRole[] = [];

  data: Category[] = [];

  constructor(private readonly guildService: GuildService) {
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

        console.log(this.data);
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }
}
