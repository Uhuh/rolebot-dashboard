import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ICategory } from 'src/app/shared/types/interfaces';
import { GuildService } from '../server.service';
import { LoadState } from '../state/loading-state';
import { CategoryCreateComponent } from './category-create/category-create.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnDestroy {
  private readonly destroyed = new Subject<void>();
  readonly LoadState = LoadState;
  loadState: LoadState = LoadState.Loading;

  guildId?: string;
  categories: ICategory[] = [];

  constructor(
    private readonly guildService: GuildService,
    private readonly dialog: MatDialog
  ) {
    this.guildService.categories$.pipe(takeUntil(this.destroyed)).subscribe({
      next: (categories) => {
        this.loadState = LoadState.Complete;
        this.categories = categories;
      },
      error: () => {
        this.loadState = LoadState.Error;
      },
    });

    this.guildService.guildId$
      .pipe(takeUntil(this.destroyed))
      .subscribe((guildId) => (this.guildId = guildId));
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CategoryCreateComponent, {
      minWidth: '350px',
      maxWidth: '500px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroyed))
      .subscribe((newCategory) => {
        if (!this.guildId) {
          return console.error('Missing guildId');
        }

        newCategory.guildId = this.guildId;

        this.loadState = LoadState.Loading;

        return this.guildService.createCategory(this.guildId, newCategory);
      });
  }

  updateCategory(category: ICategory) {
    return this.guildService.updateCategory(category);
  }
}
