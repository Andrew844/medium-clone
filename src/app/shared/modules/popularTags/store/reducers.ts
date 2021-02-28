import {PopularTagsStateInterface} from '../types/popularTagsState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from './actions/getPopularTags.action';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  data: null,
  errors: null,
};

const popularTagsReducer = createReducer(
  initialState,
  on(getPopularTagsAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getPopularTagsSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.popularTags,
  })),
  on(getPopularTagsFailureAction, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export function reducers(
  state: PopularTagsStateInterface,
  action: Action
): any {
  return popularTagsReducer(state, action);
}
