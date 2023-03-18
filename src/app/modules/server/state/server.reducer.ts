import { createReducer, on } from '@ngrx/store';
import { GuildReactType } from 'src/app/shared/types/interfaces';
import {
  addCategory,
  addReactRole,
  removeCategory,
  removeRoleCategory,
  updateCategories,
  updateCategory,
  updateConfig,
  updateGuildEmojis,
  updateGuildId,
  updateGuildRoles,
  updateReactRoles,
} from './server.actions';
import { GuildState } from './server.model';

const initialState: GuildState = {
  guildId: '0',
  guildRoles: [],
  guildEmojis: [],
  config: {
    guildId: '-1',
    hideEmojis: false,
    id: 0,
    reactType: GuildReactType.reaction,
  },
  categories: [],
  reactRoles: [],
};

export const guildReducer = createReducer(
  initialState,
  on(updateGuildId, (state, { guildId }) => ({
    ...state,
    guildId,
  })),
  on(updateGuildRoles, (state, { guildRoles }) => ({
    ...state,
    guildRoles,
  })),
  on(updateGuildEmojis, (state, { guildEmojis }) => ({
    ...state,
    guildEmojis,
  })),
  on(addCategory, (state, { category }) => ({
    ...state,
    categories: [...state.categories, category],
  })),
  on(removeCategory, (state, { category }) => {
    const categoryToDelete = state.categories.find((c) => c.id === category.id);

    if (!categoryToDelete) {
      return { ...state };
    }

    const index = state.categories.indexOf(categoryToDelete);

    if (index < 0) {
      return { ...state };
    }

    const categories = [...state.categories];
    categories.splice(index, 1);

    return {
      ...state,
      categories,
    };
  }),
  on(updateCategory, (state, { category }) => {
    const oldCategory = state.categories.find((c) => c.id === category.id);

    if (!oldCategory) {
      return { ...state };
    }

    const categories = [...state.categories];
    const index = state.categories.indexOf(oldCategory);

    categories[index] = { ...category };

    return {
      ...state,
      categories,
    };
  }),
  on(updateCategories, (state, { categories }) => ({
    ...state,
    categories: [...categories],
  })),
  on(addReactRole, (state, { reactRole }) => ({
    ...state,
    reactRoles: [...state.reactRoles, reactRole],
  })),
  on(updateReactRoles, (state, { reactRoles }) => ({
    ...state,
    reactRoles: [...reactRoles],
  })),
  on(removeRoleCategory, (state, { categoryId }) => {
    const reactRoles = [...state.reactRoles.map((r) => ({ ...r }))];
    for (const role of reactRoles) {
      if (role.categoryId === categoryId) role.categoryId = undefined;
    }

    return {
      ...state,
      reactRoles,
    };
  }),
  on(updateConfig, (state, { config }) => ({
    ...state,
    config: { ...config },
  }))
);
