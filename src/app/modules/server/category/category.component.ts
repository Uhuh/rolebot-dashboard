import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { ICategory } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnDestroy {
  private readonly destroyed$ = new Subject<void>();
  categories: ICategory[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute
  ) {
    this.route.queryParams
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((params) => {
          const guildId = params['guildId'];

          if (!guildId) return of([]);

          return this.apiService.getGuildCategories(guildId);
        })
      )
      .subscribe((categories) => {
        console.log(categories);
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  trackByFn(index: number, category: ICategory) {
    return category.id;
  }
}
