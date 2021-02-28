import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../shared/types/appState.interface';
import {UserProfileStateInterface} from '../types/userProfileState.interface';

const userProfileFeatureSelector = createFeatureSelector<
  AppStateInterface,
  UserProfileStateInterface
>('userProfile');

export const isLoadingSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.isLoading
);

export const userProfileSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.data
);

export const errorSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.error
);
