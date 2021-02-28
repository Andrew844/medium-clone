import {Action, createReducer, on} from '@ngrx/store';
import {UserProfileStateInterface} from '../types/userProfileState.interface';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from './actions/getUserProfile.action';

const initialState: UserProfileStateInterface = {
  data: null,
  error: null,
  isLoading: false,
};

export const userProfileReducer = createReducer(
  initialState,
  on(
    getUserProfileAction,
    (): UserProfileStateInterface => ({
      data: null,
      error: null,
      isLoading: true,
    })
  ),
  on(
    getUserProfileSuccessAction,
    (state, action): UserProfileStateInterface => ({
      ...state,
      data: action.userProfile,
      isLoading: false,
    })
  ),
  on(
    getUserProfileFailureAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
      error: 'Something went wrong.',
    })
  )
);

export function reducers(
  state: UserProfileStateInterface,
  action: Action
): any {
  return userProfileReducer(state, action);
}
