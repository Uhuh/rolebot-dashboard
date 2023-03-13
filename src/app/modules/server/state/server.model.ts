import {
  ICategory,
  IGuildConfig,
  IGuildEmoji,
  IGuildRole,
  IReactRole,
} from 'src/app/shared/types/interfaces';

export interface GuildState {
  guildId: string;
  guildRoles: IGuildRole[];
  guildEmojis: IGuildEmoji[];
  config: IGuildConfig;
  categories: ICategory[];
  reactRoles: IReactRole[];
}
