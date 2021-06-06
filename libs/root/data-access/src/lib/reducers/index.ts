import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@workspace/root/environments';

export interface State {}

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
