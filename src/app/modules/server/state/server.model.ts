import {
  ICategory,
  IGuildConfig,
  IReactRole,
} from 'src/app/shared/types/interfaces';

export interface GuildState {
  config: IGuildConfig;
  categories: ICategory[];
  reactRoles: IReactRole[];
}
