import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { ICategory } from 'src/app/shared/types/interfaces';
import { GuildService } from '../server.service';
import { CategoryCreateComponent } from './category-create/category-create.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnDestroy {
  private readonly destroyed = new Subject<void>();

  guildId?: string;
  categories: ICategory[] = [];

  constructor(
    private readonly guildService: GuildService,
    private readonly dialog: MatDialog
  ) {
    this.guildService.categories$
      .pipe(takeUntil(this.destroyed))
      .subscribe((categories) => {
        this.categories = categories;
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
      data: { guildId: this.guildId },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroyed))
      .subscribe((newCategory) => {
        if (!this.guildId) {
          console.error('Missing guildId');

          return of(null);
        }

        newCategory.guildId = this.guildId;

        return this.guildService.createCategory(this.guildId, newCategory);
      });
  }

  updateCategory(category: ICategory) {
    return this.guildService.updateCategory(category);
  }

  trackByFn(index: number, category: ICategory) {
    return category.id;
  }
}
