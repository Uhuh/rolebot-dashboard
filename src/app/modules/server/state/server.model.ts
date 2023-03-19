import {
  ICategory,
  IGuildConfig,
  IGuildEmoji,
  IGuildRole,
  IReactRole,
} from 'src/app/shared/types/interfaces';
import { LoadState } from './loading-state';

export interface GuildState {
  guildId?: string;
  guildRoles: IGuildRole[];
  guildEmojis: IGuildEmoji[];
  guildConfig: {
    config: IGuildConfig;
    loadState: LoadState;
  };
  categories: {
    categories: ICategory[];
    loadState: LoadState;
  };
  authLoadState: LoadState;
  reactRoles: IReactRole[];
}
