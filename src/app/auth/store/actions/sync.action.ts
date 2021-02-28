import {createAction} from '@ngrx/store';
import {ActionTypes} from '../actionTypes';

export const logout = createAction(ActionTypes.LOGOUT);
