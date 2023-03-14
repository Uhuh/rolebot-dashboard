import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/shared/services/api.service';
import { ICategory, IGuildConfig } from 'src/app/shared/types/interfaces';
import {
  addCategory,
  removeCategory,
  updateCategory,
  updateConfig,
} from './state/server.actions';
import {
  selectGuildCategories,
  selectGuildConfig,
  selectGuildEmojis,
  selectGuildId,
  selectGuildReactRoles,
  selectGuildRoles,
} from './state/server.selectors';

@Injectable()
export class GuildService {
  public readonly guildId$ = this.store.select(selectGuildId);
  public readonly guildRoles$ = this.store.select(selectGuildRoles);
  public readonly guildEmojis$ = this.store.select(selectGuildEmojis);
  public readonly config$ = this.store.select(selectGuildConfig);
  public readonly categories$ = this.store.select(selectGuildCategories);
  public readonly reactRoles$ = this.store.select(selectGuildReactRoles);

  constructor(
    private readonly store: Store,
    private readonly apiService: ApiService,
    private readonly snackbar: MatSnackBar
  ) {}

  private snackbarMessage = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) =>
    this.snackbar.open(message, 'Dismiss', {
      panelClass: `app-notification-${type}`,
    });

  updateConfig(config: IGuildConfig) {
    return this.apiService.updateConfig(config.guildId, config).subscribe({
      next: (config) => {
        this.store.dispatch(updateConfig({ config }));
        this.snackbarMessage('Successfully updated config!');
      },
      error: () =>
        this.snackbarMessage(
          'There was an issue updating your config...',
          'error'
        ),
    });
  }

  updateCategory(category: ICategory) {
    return this.apiService
      .updateCategory(category.guildId, category)
      .subscribe({
        next: (category) => {
          this.store.dispatch(updateCategory({ category }));
          this.snackbarMessage('Successfully updated category!');
        },
        error: () =>
          this.snackbarMessage('Issues updating your category...', 'error'),
      });
  }

  createCategory(guildId: string, category: ICategory) {
    return this.apiService.createCategory(guildId, category).subscribe({
      next: (category) => {
        this.store.dispatch(addCategory({ category }));
        this.snackbarMessage('Successfully created the category!');
      },
      error: () =>
        this.snackbarMessage('Failed to create the category...', 'error'),
    });
  }

  deleteCategory(guildId: string, category: ICategory) {
    return this.apiService.deleteCategory(guildId, `${category.id}`).subscribe({
      next: (category) => {
        this.store.dispatch(removeCategory({ category }));
        this.snackbarMessage('Successfully deleted the category!');
      },
      error: () =>
        this.snackbarMessage('Failed to delete the category...', 'error'),
    });
  }
}
