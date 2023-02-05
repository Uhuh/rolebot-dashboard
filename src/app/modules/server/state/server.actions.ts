import { createAction, props } from '@ngrx/store';
import {
  ICategory,
  IGuildConfig,
  IReactRole,
} from 'src/app/shared/types/interfaces';

export const updateGuildId = createAction(
  '[ GuildState ] Updating id',
  props<{ guildId: string }>()
);
export const addCategory = createAction(
  '[ GuildState ] Adding category',
  props<{ category: ICategory }>()
);
export const removeCategory = createAction(
  '[ GuildState ] Removing category',
  props<{ category: ICategory }>()
);
export const updateCategory = createAction(
  '[ GuildState ] Updating category',
  props<{ category: ICategory }>()
);
export const updateCategories = createAction(
  '[ GuildState ] Updating categories',
  props<{ categories: ICategory[] }>()
);
export const updateReactRoles = createAction(
  '[ GuildState ] Updating react roles',
  props<{ reactRoles: IReactRole[] }>()
);
export const updateConfig = createAction(
  '[ GuildState ] Updating config',
  props<{ config: IGuildConfig }>()
);
