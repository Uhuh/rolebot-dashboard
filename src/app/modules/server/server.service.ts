import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/shared/services/api.service';
import { ICategory, IGuildConfig } from 'src/app/shared/types/interfaces';
import { updateCategory, updateConfig } from './state/server.actions';
import {
  selectGuildCategories,
  selectGuildConfig,
  selectGuildReactRoles,
} from './state/server.selectors';

@Injectable()
export class GuildService {
  public readonly config$ = this.store.select(selectGuildConfig);
  public readonly categories$ = this.store.select(selectGuildCategories);
  public readonly reactRoles$ = this.store.select(selectGuildReactRoles);

  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly snackbar: MatSnackBar
  ) {}

  updateConfig(config: IGuildConfig) {
    return this.apiService.updateConfig(config.guildId, config).subscribe({
      next: (config) => {
        this.store.dispatch(updateConfig({ config }));

        this.snackbar.open(`Successfully updated config!`, 'Ok', {
          panelClass: 'app-notification-success',
        });
      },
      error: () => {
        this.snackbar.open(
          `There was an issue updating your config...`,
          'Dismiss',
          {
            panelClass: 'app-notification-error',
          }
        );
      },
    });
  }

  updateCategory(category: ICategory) {
    return this.apiService
      .updateCategory(category.guildId, category)
      .subscribe({
        next: (category) => {
          this.store.dispatch(updateCategory({ category }));

          this.snackbar.open(`Successfully updated category!`, 'Ok', {
            panelClass: 'app-notification-success',
          });
        },
        error: () => {
          this.snackbar.open(`Issues updating your category...`, 'Dismiss', {
            panelClass: 'app-notification-error',
          });
        },
      });
  }
}
