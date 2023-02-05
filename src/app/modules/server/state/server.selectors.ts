import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { GuildState } from './server.model';

export const _selectGuildDetails =
  createFeatureSelector<Readonly<GuildState>>('guildDetails');

export const selectGuildConfig = createSelector(
  _selectGuildDetails,
  (state) => state.config
);
export const selectGuildCategories = createSelector(
  _selectGuildDetails,
  (state) => state.categories
);
export const selectGuildReactRoles = createSelector(
  _selectGuildDetails,
  (state) => state.reactRoles
);
