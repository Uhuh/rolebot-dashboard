import {
  ICategory,
  IGuildConfig,
  IReactRole,
} from 'src/app/shared/types/interfaces';

export interface GuildState {
  guildId: string;
  config: IGuildConfig;
  categories: ICategory[];
  reactRoles: IReactRole[];
}
