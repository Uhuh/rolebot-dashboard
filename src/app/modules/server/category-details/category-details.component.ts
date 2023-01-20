import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { ICategory, IReactRole } from 'src/app/shared/types/interfaces';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent {
  categories: ICategory[] = [];
  roles: IReactRole[] = [];

  constructor(
    private readonly router: ActivatedRoute,
    private readonly apiService: ApiService
  ) {
    this.router.params
      .pipe(
        switchMap((params) => {
          const guildId = params['guildId'];

          if (!guildId) {
            return of([]);
          }

          return this.apiService.getGuildCategories(guildId);
        })
      )
      .subscribe((categories) => {
        this.categories = categories;
      });
  }
}
