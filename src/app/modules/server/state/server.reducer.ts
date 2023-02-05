import { createReducer, on } from '@ngrx/store';
import { GuildReactType } from 'src/app/shared/types/interfaces';
import {
  updateCategories,
  updateCategory,
  updateConfig,
  updateReactRoles,
} from './server.actions';
import { GuildState } from './server.model';

const initialState: GuildState = {
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
  on(updateReactRoles, (state, { reactRoles }) => ({
    ...state,
    reactRoles: [...reactRoles],
  })),
  on(updateConfig, (state, { config }) => ({
    ...state,
    config: { ...config },
  }))
);
