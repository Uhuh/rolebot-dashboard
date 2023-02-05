import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { ICategory } from 'src/app/shared/types/interfaces';
import { GuildService } from '../server.service';
import { CategoryCreateComponent } from './category-create/category-create.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnDestroy {
  private guildId?: string;
  private readonly destroyed = new Subject<void>();
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
      .subscribe((result) => {
        console.log(result);
      });
  }

  updateCategory(category: ICategory) {
    return this.guildService.updateCategory(category);
  }

  trackByFn(index: number, category: ICategory) {
    return category.id;
  }
}
