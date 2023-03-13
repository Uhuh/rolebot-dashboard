import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { GuildState } from './server.model';

export const _selectGuildDetails =
  createFeatureSelector<Readonly<GuildState>>('guildDetails');

export const selectGuildId = createSelector(
  _selectGuildDetails,
  (state) => state.guildId
);
export const selectGuildRoles = createSelector(
  _selectGuildDetails,
  (state) => state.guildRoles
);
export const selectGuildEmojis = createSelector(
  _selectGuildDetails,
  (state) => state.guildEmojis
);
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
