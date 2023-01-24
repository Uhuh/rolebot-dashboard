import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { ICategory } from 'src/app/shared/types/interfaces';
import { CategoryCreateComponent } from './category-create/category-create.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnDestroy {
  private guildId?: string;
  private readonly destroyed$ = new Subject<void>();
  categories: ICategory[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) {
    this.route.queryParams
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((params) => {
          const guildId = params['guildId'];

          if (!guildId) return of([]);

          this.guildId = guildId;

          return this.apiService.getGuildCategories(guildId);
        })
      )
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CategoryCreateComponent, {
      minWidth: '350px',
      maxWidth: '500px',
      data: { guildId: this.guildId },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => {
        console.log(result);
      });
  }

  updateCategory(category: ICategory) {
    console.log(category);
    return this.apiService
      .updateCategory(category.guildId, category)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.snackBar.open(`Successfully updated category!`, 'Ok', {
          panelClass: 'app-notification-success',
        });
      });
  }

  trackByFn(index: number, category: ICategory) {
    return category.id;
  }
}
