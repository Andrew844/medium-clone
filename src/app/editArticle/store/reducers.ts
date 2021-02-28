import {EditArticleStateInterface} from './types/editArticleState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  updateArticleAction,
  updateArticleSuccessAction,
  updateArticleFailureAction,
} from './actions/updateArticle.action';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from './actions/getArticle.action';

const initialState: EditArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
  article: null,
  isLoading: false,
};

const editArticleReducer = createReducer(
  initialState,
  on(
    updateArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    updateArticleSuccessAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    updateArticleFailureAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    getArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: true,
      article: null,
      isLoading: true,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      article: action.article,
      isLoading: false,
    })
  ),
  on(
    getArticleFailureAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      article: null,
      isLoading: false,
    })
  )
);

export function reducers(
  state: EditArticleStateInterface,
  action: Action
): any {
  return editArticleReducer(state, action);
}
