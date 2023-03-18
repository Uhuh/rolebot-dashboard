export enum LoadState {
  Loading,
  Submitting,
  Complete,
  Error,
}

export interface ILoadingState {
  upToDate?: boolean;
  loadState?: LoadState;
}
