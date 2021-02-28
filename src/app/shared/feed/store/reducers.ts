import {FeedStateInterface} from '../types/feedState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from './actions/getFeed.action';
import {routerNavigationAction} from '@ngrx/router-store';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const feedReducer = createReducer(
  initialState,
  on(getFeedAction, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getFeedSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    data: action.feed,
  })),
  on(getFeedFailureAction, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(routerNavigationAction, (): FeedStateInterface => initialState)
);

export function reducers(state: FeedStateInterface, action: Action): any {
  return feedReducer(state, action);
}
